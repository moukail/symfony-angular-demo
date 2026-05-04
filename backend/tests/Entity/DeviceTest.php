<?php

namespace App\Tests\Entity;

use App\Entity\Device;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class DeviceTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $device = new Device();

        $reflection = new ReflectionClass(Device::class);
        $property = $reflection->getProperty('id');
        $property->setValue($device, 123);
        $this->assertEquals(123, $device->getId());

        $device->setMacAddress('00:11:22:33:44:55');
        $this->assertEquals('00:11:22:33:44:55', $device->getMacAddress());

        $device->setIpAddress('192.168.1.100');
        $this->assertEquals('192.168.1.100', $device->getIpAddress());

        $device->setCreatedAt();
        $this->assertInstanceOf(\DateTimeImmutable::class, $device->getCreatedAt());

        $device->setUpdatedAt();
        $this->assertInstanceOf(\DateTimeImmutable::class, $device->getUpdatedAt());
    }
}
