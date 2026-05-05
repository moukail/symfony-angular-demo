<?php

namespace App\Model;

use App\Entity\StreamType;
use Symfony\Component\Validator\Constraints as Assert;

class StreamDto
{
    public function __construct(
        #[Assert\Choice(choices: ['video/mp4', 'application/vnd.apple.mpegurl', 'application/x-mpegURL'])]
        public string $mimeType,
        #[Assert\NotBlank]
        public string $source,
        public StreamType $type,
        #[Assert\NotBlank]
        public string $url,
        //#[Assert\Choice(choices: ['cenc', 'playready', 'widevine', 'clear'])]
        //public string $drm,
    ) {}
}