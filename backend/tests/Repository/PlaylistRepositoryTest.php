<?php

namespace App\Tests\Repository;

use App\Entity\M3u;
use App\Entity\Playlist;
use App\Entity\Xtream;
use App\Model\M3uDto;
use App\Model\XtreamDto;
use App\Repository\PlaylistRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class PlaylistRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private PlaylistRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        $classMetadata = new ClassMetadata(Playlist::class);

        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn($classMetadata);

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new PlaylistRepository($registry);
    }

    public function testSaveM3u(): void
    {
        $dto = new M3uDto(
            macAddress: '00:11:22:33:44:55',
            name: 'Test M3u',
            url: 'http://example.com/playlist.m3u',
        );

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(function (M3u $m3u) use ($dto): bool {
                return $m3u->getName() === $dto->name
                    && $m3u->getUrl() === $dto->url;
            }));

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $result = $this->repository->saveM3u($dto);

        $this->assertInstanceOf(M3u::class, $result);
        $this->assertEquals('Test M3u', $result->getName());
        $this->assertEquals('http://example.com/playlist.m3u', $result->getUrl());
    }

    public function testSaveXtream(): void
    {
        $dto = new XtreamDto(
            macAddress: '00:11:22:33:44:55',
            name: 'Test Xtream',
            url: 'http://example.com/xtream',
            username: 'user123',
            password: 'pass123',
        );

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(function (Xtream $xtream) use ($dto): bool {
                return $xtream->getName() === $dto->name
                    && $xtream->getUrl() === $dto->urlPersistsAndReturnsEntity
                    && $xtream->getUsername() === $dto->username
                    && $xtream->getPassword() === $dto->password;
            }));

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $result = $this->repository->saveXtream($dto);

        $this->assertInstanceOf(Xtream::class, $result);
        $this->assertEquals('Test Xtream', $result->getName());
        $this->assertEquals('http://example.com/xtream', $result->getUrl());
        $this->assertEquals('user123', $result->getUsername());
        $this->assertEquals('pass123', $result->getPassword());
    }
}
