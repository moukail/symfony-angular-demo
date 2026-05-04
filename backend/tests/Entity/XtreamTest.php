<?php

namespace App\Tests\Entity;

use App\Entity\Xtream;
use PHPUnit\Framework\TestCase;

class XtreamTest extends TestCase
{
    public function testToArray(): void
    {
        $xtream = new Xtream();
        $xtream->setName('My Xtream Playlist');
        $xtream->setUrl('http://example.com/playlist.m3u');
        $xtream->setUsername('user123');
        $xtream->setPassword('pass123');

        $expected = [
            'id' => null,
            'name' => 'My Xtream Playlist',
            'url' => 'http://example.com/playlist.m3u',
            'username' => 'user123',
            'password' => 'pass123',
        ];

        $this->assertEquals($expected, $xtream->toArray());
    }
}
