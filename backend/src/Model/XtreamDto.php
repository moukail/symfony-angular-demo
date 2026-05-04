<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class XtreamDto
{
    public function __construct(
        #[Assert\NotBlank]
        public string $macAddress,
        #[Assert\NotBlank]
        public string $name,
        #[Assert\NotBlank]
        public string $url,
        #[Assert\NotBlank]
        public string $username,
        #[Assert\NotBlank]
        public string $password,
    ) {}
}