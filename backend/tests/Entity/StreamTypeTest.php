<?php

namespace App\Tests\Entity;

use App\Entity\StreamType;
use PHPUnit\Framework\TestCase;

class StreamTypeTest extends TestCase
{
    public function testEnumCases(): void
    {
        self::assertSame('hls', StreamType::hls->name);
        self::assertSame('dash', StreamType::dash->name);

        self::assertSame('HLS', StreamType::hls->label());
        self::assertSame('DASH', StreamType::dash->label());
    }

    public function testEnumValues(): void
    {
        $cases = StreamType::cases();
        self::assertCount(2, $cases);
        self::assertContains(StreamType::hls, $cases);
        self::assertContains(StreamType::dash, $cases);
    }
}
