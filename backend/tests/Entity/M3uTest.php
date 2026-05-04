<?php

namespace App\Tests\Entity;

use App\Entity\M3u;
use PHPUnit\Framework\TestCase;

class M3uTest extends TestCase
{
    public function testToArray(): void
    {
        $m3u = new M3u();
        $m3u->setName('My M3u Playlist');
        $m3u->setUrl('http://example.com/playlist.m3u');

        $expected = [
            'id' => null, // Since we haven't set an ID or persisted it
            'name' => 'My M3u Playlist',
            'url' => 'http://example.com/playlist.m3u',
        ];

        $this->assertEquals($expected, $m3u->toArray());
    }
}
