<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class M3uDto
{
    public function __construct(
        #[Assert\Regex(pattern: '/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/')]
        public string $macAddress,
        #[Assert\NotBlank]
        public string $name,
        #[Assert\Url]
        public string $url,
    ) {}
}