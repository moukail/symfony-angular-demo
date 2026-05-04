<?php

namespace App\Tests\Repository;

use App\Entity\M3u;
use App\Entity\Playlist;
use App\Entity\Xtream;
use App\Entity\Device;
use App\Model\M3uDto;
use App\Model\XtreamDto;
use App\Repository\PlaylistRepository;
use App\Repository\DeviceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

class PlaylistRepositoryTest extends TestCase
{
    private EntityManagerInterface&MockObject $entityManager;
    private DeviceRepository&MockObject $deviceRepository;
    private PlaylistRepository $repository;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->deviceRepository = $this->createMock(DeviceRepository::class);

        $classMetadata = new ClassMetadata(Playlist::class);

        $this->entityManager
            ->method('getClassMetadata')
            ->willReturn($classMetadata);

        $registry = $this->createStub(ManagerRegistry::class);
        $registry
            ->method('getManagerForClass')
            ->willReturn($this->entityManager);

        $this->repository = new PlaylistRepository($registry, $this->deviceRepository);
    }

    public function testGetOrCreateDeviceWhenExists(): void
    {
        $macAddress = '00:11:22:33:44:55';
        $existingDevice = (new Device())->setMacAddress($macAddress);

        $this->deviceRepository
            ->expects($this->once())
            ->method('findOneBy')
            ->with(['macAddress' => $macAddress])
            ->willReturn($existingDevice);

        $this->deviceRepository
            ->expects($this->never())
            ->method('save');

        $method = new ReflectionMethod(PlaylistRepository::class, 'getOrCreateDevice');
        
        $result = $method->invoke($this->repository, $macAddress);

        $this->assertSame($existingDevice, $result);
    }

    public function testGetOrCreateDeviceWhenNotExists(): void
    {
        $macAddress = 'AA:BB:CC:DD:EE:FF';

        $this->deviceRepository
            ->expects($this->once())
            ->method('findOneBy')
            ->with(['macAddress' => $macAddress])
            ->willReturn(null);

        $this->deviceRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (Device $device) use ($macAddress): bool {
                return $device->getMacAddress() === $macAddress;
            }));

        $method = new ReflectionMethod(PlaylistRepository::class, 'getOrCreateDevice');
        
        $result = $method->invoke($this->repository, $macAddress);

        $this->assertInstanceOf(Device::class, $result);
        $this->assertEquals($macAddress, $result->getMacAddress());
    }

    public function testSaveM3u(): void
    {
        $dto = new M3uDto(
            macAddress: '00:11:22:33:44:55',
            name: 'Test M3u',
            url: 'http://example.com/playlist.m3u',
        );

        $device = (new Device())->setMacAddress($dto->macAddress);
        $this->deviceRepository
            ->method('findOneBy')
            ->with(['macAddress' => $dto->macAddress])
            ->willReturn($device);

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(function (M3u $m3u) use ($dto, $device): bool {
                return $m3u->getName() === $dto->name
                    && $m3u->getUrl() === $dto->url
                    && $m3u->getDevice() === $device;
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

        $device = (new Device())->setMacAddress($dto->macAddress);
        $this->deviceRepository
            ->method('findOneBy')
            ->with(['macAddress' => $dto->macAddress])
            ->willReturn($device);

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(function (Xtream $xtream) use ($dto, $device): bool {
                return $xtream->getName() === $dto->name
                    && $xtream->getUrl() === $dto->url
                    && $xtream->getUsername() === $dto->username
                    && $xtream->getPassword() === $dto->password
                    && $xtream->getDevice() === $device;
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
