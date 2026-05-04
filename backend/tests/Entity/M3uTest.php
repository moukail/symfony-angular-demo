<?php

namespace App\Tests\Entity;

use App\Entity\M3u;
use PHPUnit\Framework\TestCase;

class M3uTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $m3u = new M3u();
        $m3u->setName('My M3u Playlist');
        $m3u->setUrl('http://example.com/playlist.m3u');

        $this->assertEquals('My M3u Playlist', $m3u->getName());
        $this->assertEquals('http://example.com/playlist.m3u', $m3u->getUrl());
    }
}
