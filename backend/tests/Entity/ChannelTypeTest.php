<?php

namespace App\Tests\Entity;

use App\Entity\ChannelType;
use PHPUnit\Framework\TestCase;

class ChannelTypeTest extends TestCase
{
    public function testEnumCases(): void
    {
        self::assertSame('TV', ChannelType::TV->name);
        self::assertSame('Radio', ChannelType::Radio->name);

        self::assertSame('TV', ChannelType::TV->label());
        self::assertSame('Radio', ChannelType::Radio->label());
    }

    public function testEnumValues(): void
    {
        $cases = ChannelType::cases();
        self::assertCount(2, $cases);
        self::assertContains(ChannelType::TV, $cases);
        self::assertContains(ChannelType::Radio, $cases);
    }
}
