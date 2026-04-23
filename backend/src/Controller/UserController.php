<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use App\Repository\UserRepository;
use App\Model\UserDto;
use App\Entity\User;

#[Route('/api/v1/users')]

class UserController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {}

    #[Route('', methods: ['GET'])]
    public function getUsers(Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
        $offset = ($page - 1) * $limit;

        $query = $this->userRepository->createQueryBuilder('u')
            ->orderBy('u.id', 'DESC')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery();

        $paginator = new Paginator($query);
        $totalItems = count($paginator);
        $users = iterator_to_array($paginator);

        return $this->json([
            'data' => $users,
            'meta' => [
                'total' => $totalItems,
                'page' => $page,
                'limit' => $limit
            ]
        ], Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getUserById(int $id): JsonResponse
    {
        $user = $this->userRepository->find($id);
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('', methods: ['POST'])]
    public function createUser(#[MapRequestPayload] UserDto $userDto): JsonResponse
    {
        $user = new User();
        $user->setEmail($userDto->email);
        $user->setRoles($userDto->roles);
        
        $hashedPassword = $this->passwordHasher->hashPassword($user, $userDto->password);
        $user->setPassword($hashedPassword);
        
        $this->userRepository->save($user);
        return $this->json($user, Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function updateUser(int $id, #[MapRequestPayload] UserDto $userDto): JsonResponse
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $user->setEmail($userDto->email);
        $user->setRoles($userDto->roles);
        
        if ($userDto->password) {
            $hashedPassword = $this->passwordHasher->hashPassword($user, $userDto->password);
            $user->setPassword($hashedPassword);
        }
        
        $this->userRepository->save($user);
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteUser(int $id): JsonResponse
    {
        $user = $this->userRepository->find($id);
        $this->userRepository->remove($user);
        return $this->json([], Response::HTTP_OK, [], ['groups' => 'user:read']);
    }
}
