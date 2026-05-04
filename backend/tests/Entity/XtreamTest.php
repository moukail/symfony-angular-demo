<?php

namespace App\Tests\Entity;

use App\Entity\Xtream;
use PHPUnit\Framework\TestCase;

class XtreamTest extends TestCase
{
    public function testGettersAndSetters(): void
    {
        $xtream = new Xtream();

        $xtream->setUsername('testuser');
        $this->assertEquals('testuser', $xtream->getUsername());

        $xtream->setPassword('secretpassword');
        $this->assertEquals('secretpassword', $xtream->getPassword());

        $xtream->setName('My Xtream Playlist');
        $this->assertEquals('My Xtream Playlist', $xtream->getName());

        $xtream->setUrl('http://example.com/xtream');
        $this->assertEquals('http://example.com/xtream', $xtream->getUrl());
    }
}
