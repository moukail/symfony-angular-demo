<?php

namespace App\Tests\Repository;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use App\Repository\ChannelRepository;
use App\Entity\Channel;
use App\Entity\ChannelType;

class ChannelRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private ChannelRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        $classMetadata = new ClassMetadata(Channel::class);

        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn($classMetadata);

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new ChannelRepository($registry);
    }

    public function testSave(): void
    {
        $channel = (new Channel())
            ->setName('Test Channel')
            ->setType(ChannelType::TV)
            ->setCountry('US')
            ->setLanguage('en')
            ->setWebsite('https://test.com')
            ->setLogo('https://test.com/logo.png');

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($channel);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $result = $this->repository->save($channel);

        $this->assertSame($channel, $result);
        $this->assertEquals('Test Channel', $result->getName());
    }

    public function testRemove(): void
    {
        $channel = (new Channel())
            ->setName('To Delete')
            ->setType(ChannelType::Radio)
            ->setCountry('NL')
            ->setLanguage('nl');

        $this->entityManager
            ->expects($this->once())
            ->method('remove')
            ->with($channel);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $this->repository->remove($channel);
    }
}