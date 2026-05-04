<?php

namespace App\Entity;

enum ChannelType: string
{
    case TV = 'TV';
    case Radio = 'Radio';

    public function label(): string
    {
        return $this->value;
    }
}