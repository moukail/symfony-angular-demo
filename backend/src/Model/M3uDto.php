<?php

namespace App\Model;

class M3uDto
{
    public function __construct(
        public string $macAddress,
        public string $name,
        public string $url,
    ) {}
}