<?php

namespace App\Tests\Entity;

use App\Entity\Device;
use PHPUnit\Framework\TestCase;

class DeviceTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $device = new Device();

        $device->setMacAddress('00:11:22:33:44:55');
        $this->assertEquals('00:11:22:33:44:55', $device->getMacAddress());

        $device->setIpAddress('192.168.1.100');
        $this->assertEquals('192.168.1.100', $device->getIpAddress());

        $this->assertInstanceOf(\DateTimeImmutable::class, $device->getCreatedAt());
        $this->assertInstanceOf(\DateTimeImmutable::class, $device->getUpdatedAt());
    }
}
