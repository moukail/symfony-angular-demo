<?php

namespace App\Tests\Repository;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use App\Repository\DeviceRepository;
use App\Entity\Device;

class DeviceRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private DeviceRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn(new ClassMetadata(Device::class));

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new DeviceRepository($registry);
    }

    public function testSave(): void
    {
        $device = (new Device())
            ->setMacAddress('A1:B2:C3:D4:E5:F6')
            ->setIpAddress('[IP_ADDRESS]');

        $this->entityManager->expects($this->once())
            ->method('persist')
            ->with($device);
        
        $this->repository->save($device);
    }

    public function testRemove(): void
    {
        $device = (new Device())
            ->setMacAddress('A1:B2:C3:D4:E5:F6')
            ->setIpAddress('[IP_ADDRESS]');

        $this->entityManager->expects($this->once())
            ->method('remove')
            ->with($device);
        
        $this->repository->remove($device);
    }

    public function testFindById(): void
    {
        $device = (new Device())
            ->setMacAddress('A1:B2:C3:D4:E5:F6')
            ->setIpAddress('[IP_ADDRESS]');

        $this->entityManager->expects($this->once())
            ->method('find')
            ->willReturn($device);
        
        $this->assertEquals($device, $this->repository->find(1));
    }
}