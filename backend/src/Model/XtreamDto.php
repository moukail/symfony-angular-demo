<?php

namespace App\Model;

class XtreamDto
{
    public function __construct(
        public string $macAddress,
        public string $name,
        public string $url,
        public string $username,
        public string $password,
    ) {}
}