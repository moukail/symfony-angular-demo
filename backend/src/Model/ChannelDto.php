<?php

namespace App\Model;

use App\Entity\ChannelType;
use Symfony\Component\Validator\Constraints as Assert;

class ChannelDto
{
    public function __construct(
        #[Assert\NotBlank]
        public string $name,
        #[Assert\NotBlank]
        public ChannelType $type,
        #[Assert\Country]
        public string $country,
        #[Assert\Language]
        public string $language,
        #[Assert\Url]
        public string $website,
        #[Assert\Url]
        public string $logo,
        #[Assert\NotBlank]
        public bool $active,
    ) {}
}
