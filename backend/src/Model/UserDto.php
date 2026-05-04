<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class UserDto
{
    public function __construct(
        #[Assert\Email]
        public string $email,
        #[Assert\Length(min: 6)]
        public string $password,
        #[Assert\Count(min: 1)]
        #[Assert\All([
            new Assert\Choice([
                'choices' => ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN']
            ])
        ])]
        public array $roles,
    ) {}
}