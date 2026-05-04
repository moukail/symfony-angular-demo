<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use App\Repository\ChannelRepository;
use App\Model\ChannelDto;
use App\Entity\Channel;

class ChannelController extends AbstractController
{
    public function __construct(private ChannelRepository $channelRepository)
    {}

    #[Route('/api/v1/channels', name: 'app_channels', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $result = $this->channelRepository->findBy(/*['active' => true], */['name' => 'ASC']);

        return $this->json($result, Response::HTTP_OK, [], [
            'groups' => ['user'],
        ]);
    }

    #[Route('/api/v1/channels', name: 'app_channels_add', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function add(#[MapRequestPayload] ChannelDto $model): JsonResponse
    {
        $result = $this->channelRepository->save(
            (new Channel())
            ->setCountry($model->country)
            ->setType($model->type)
            ->setName($model->name)
            ->setLanguage($model->language)
            ->setWebsite($model->website)
            ->setLogo($model->logo)
            ->setActive($model->active)
        );

        return $this->json($result, Response::HTTP_CREATED, [], ['groups' => ['user']]);
    }

    #[Route('/api/v1/channels/{id}', name: 'app_channels_update', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(string $id, #[MapRequestPayload] ChannelDto $model): JsonResponse
    {
        $channel = $this->channelRepository->find($id);
        $channel
            ->setName($model->name)
            ->setType($model->type)
            ->setCountry($model->country)
            ->setLanguage($model->language)
            ->setWebsite($model->website)
            ->setLogo($model->logo)
        ;
        $result = $this->channelRepository->save($channel);

        return $this->json($result, Response::HTTP_OK, [], ['groups' => ['user']]);
    }

    #[Route('/api/v1/channels/{id}', name: 'app_channels_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(string $id): JsonResponse
    {
        if (!$this->isGranted('ROLE_ADMIN')) {
            return new JsonResponse(['error' => 'Access denied'], 403);
        }

        $channel = $this->channelRepository->find($id);
        $this->channelRepository->remove($channel);

        return $this->json($channel, Response::HTTP_OK, [], ['groups' => ['user']]);
    }
}
