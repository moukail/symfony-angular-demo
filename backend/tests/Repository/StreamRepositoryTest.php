<?php

namespace App\Tests\Repository;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use App\Repository\StreamRepository;
use App\Entity\Stream;
use App\Entity\Channel;
use App\Entity\StreamType;

class StreamRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private StreamRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        $classMetadata = new ClassMetadata(Stream::class);

        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn($classMetadata);

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new StreamRepository($registry);
    }

    public function testSave(): void
    {
        $channel = $this->createMock(Channel::class);

        $stream = (new Stream())
            ->setChannel($channel)
            ->setUrl('https://example.com/stream')
            ->setMimeType('video/mp4')
            ->setSource('example')
            ->setType(StreamType::hls);
        
        $this->entityManager->expects($this->once())
            ->method('persist')
            ->with($stream);
        
        $this->repository->save($stream);
    }

    public function testRemove(): void
    {
        $channel = $this->createMock(Channel::class);
        $stream = (new Stream())
            ->setChannel($channel)
            ->setUrl('https://example.com/stream')
            ->setMimeType('video/mp4')
            ->setSource('example')
            ->setType(StreamType::hls);

        $this->entityManager
            ->expects($this->once())
            ->method('remove')
            ->with($stream);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $this->repository->remove($stream);
    }
}