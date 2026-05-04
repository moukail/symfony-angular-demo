<?php

namespace App\Tests\Repository;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class UserRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private UserRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        $classMetadata = new ClassMetadata(User::class);

        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn($classMetadata);

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new UserRepository($registry);
    }

    public function testSave(): void
    {
        $user = new User();
        $user->setEmail('test@example.com')
             ->setPassword('hashed_password')
             ->setRole('ROLE_USER');

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($user);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $result = $this->repository->save($user);
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('test@example.com', $result->getEmail());
        $this->assertEquals('hashed_password', $result->getPassword());
        $this->assertEquals('ROLE_USER', $result->getRole());
    }

    public function testRemove(): void
    {
        $user = new User();
        $user->setEmail('delete@example.com')
             ->setPassword('hashed_password')
             ->setRole('ROLE_USER');

        $this->entityManager
            ->expects($this->once())
            ->method('remove')
            ->with($user);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $this->repository->remove($user);
    }
}
