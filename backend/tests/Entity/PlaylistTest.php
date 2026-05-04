<?php

namespace App\Tests\Entity;

use App\Entity\Device;
use App\Entity\Playlist;
use PHPUnit\Framework\TestCase;

class PlaylistTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $playlist = new Playlist();

        $playlist->setName('My Playlist');
        $this->assertEquals('My Playlist', $playlist->getName());

        $playlist->setUrl('http://example.com/playlist.m3u');
        $this->assertEquals('http://example.com/playlist.m3u', $playlist->getUrl());

        $device = new Device();
        $playlist->setDevice($device);
        $this->assertSame($device, $playlist->getDevice());

        $this->assertInstanceOf(\DateTimeImmutable::class, $playlist->getCreatedAt());
        $this->assertInstanceOf(\DateTimeImmutable::class, $playlist->getUpdatedAt());
    }
}
