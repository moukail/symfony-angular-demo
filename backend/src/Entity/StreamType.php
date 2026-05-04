<?php

namespace App\Entity;

enum StreamType: string
{
    case hls = 'hls';
    case dash = 'dash';

    public function label(): string
    {
        return match ($this) {
            self::hls => 'HLS',
            self::dash => 'DASH',
        };
    }
}