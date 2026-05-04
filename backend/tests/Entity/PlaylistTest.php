<?php

namespace App\Tests\Entity;

use App\Entity\Device;
use App\Entity\Playlist;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class PlaylistTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $playlist = new Playlist();

        $reflection = new ReflectionClass(Playlist::class);
        $property = $reflection->getProperty('id');
        $property->setValue($playlist, 123);
        $this->assertEquals(123, $playlist->getId());

        $playlist->setName('My Playlist');
        $this->assertEquals('My Playlist', $playlist->getName());

        $playlist->setUrl('http://example.com/playlist.m3u');
        $this->assertEquals('http://example.com/playlist.m3u', $playlist->getUrl());

        $device = new Device();
        $playlist->setDevice($device);
        $this->assertSame($device, $playlist->getDevice());

        $this->assertInstanceOf(\DateTimeImmutable::class, $playlist->getCreatedAt());

        $playlist->setUpdatedAt();
        $this->assertInstanceOf(\DateTimeImmutable::class, $playlist->getUpdatedAt());
    }
}
