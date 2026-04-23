<?php

namespace App\Model;

class UserDto
{
    public function __construct(
        public string $email,
        public string $password,
        public array $roles,
    ) {}
}