<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class StreamDto
{
    public function __construct(
        #[Assert\Choice(choices: ['video/mp4', 'application/vnd.apple.mpegurl'])]
        public string $mime_type,
        #[Assert\NotBlank]
        public string $source,
        #[Assert\NotBlank]
        public string $url,
    ) {}
}