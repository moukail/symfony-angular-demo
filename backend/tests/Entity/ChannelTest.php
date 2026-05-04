<?php

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\Channel;
use App\Entity\ChannelType;
use App\Entity\Stream;
use App\Entity\StreamType;

class ChannelTest extends TestCase
{
    public function testCanBeCreatedFromValues(): void
    {
        $channel = new Channel();
        $channel
            ->setName('Test Channel')
            ->setType(ChannelType::TV)
            ->setCountry('US')
            ->setLanguage('en')
            ->setWebsite('https://test.com')
            ->setLogo('https://test.com/logo.png')
            ->setActive(true);

        $this->assertEquals('Test Channel', $channel->getName());
        $this->assertEquals(ChannelType::TV, $channel->getType());
        $this->assertEquals('US', $channel->getCountry());
        $this->assertEquals('en', $channel->getLanguage());
        $this->assertEquals('https://test.com', $channel->getWebsite());
        $this->assertEquals('https://test.com/logo.png', $channel->getLogo());
        $this->assertEquals(true, $channel->isActive());
    }

    public function testStreamsCollection(): void
    {
        $channel = new Channel();
        $stream = new Stream();
        $stream
            ->setMimeType('video/mp4')
            ->setType(StreamType::hls)
            ->setSource('http')
            ->setUrl('http://example.com/stream.m3u8');

        $this->assertCount(0, $channel->getStreams());

        $channel->addStream($stream);
        $this->assertCount(1, $channel->getStreams());
        $this->assertTrue($channel->getStreams()->contains($stream));
        $this->assertSame($channel, $stream->getChannel());

        // Test adding same stream twice (should not add)
        $channel->addStream($stream);
        $this->assertCount(1, $channel->getStreams());

        $channel->removeStream($stream);
        $this->assertCount(0, $channel->getStreams());
        $this->assertFalse($channel->getStreams()->contains($stream));
    }
}
