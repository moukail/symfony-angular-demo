<?php

namespace App\Tests\Entity;

use App\Entity\Stream;
use App\Entity\StreamType;
use Symfony\Component\Uid\Uuid;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class StreamTest extends TestCase
{
    public function testCanBeCreatedFromValues(): void
    {
        $stream = new Stream();

        $uuid = Uuid::v4();
        $reflection = new ReflectionClass(Stream::class);
        $property = $reflection->getProperty('id');
        $property->setValue($stream, $uuid);
        $this->assertEquals($uuid, $stream->getId());

        $stream->setMimeType('video/mp4');
        $this->assertEquals('video/mp4', $stream->getMimeType());

        $stream->setSource('http');
        $this->assertEquals('http', $stream->getSource());

        $stream->setType(StreamType::hls);
        $this->assertEquals(StreamType::hls, $stream->getType());

        $stream->setUrl('https://example.com/stream.m3u8');
        $this->assertEquals('https://example.com/stream.m3u8', $stream->getUrl());

        $stream->setDrm(true);
        $this->assertTrue($stream->isDrm());

        $stream->setDrmLicense('https://example.com/license');
        $this->assertEquals('https://example.com/license', $stream->getDrmLicense());
    }
}
