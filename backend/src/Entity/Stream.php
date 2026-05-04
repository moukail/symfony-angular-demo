<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Uid\Uuid;

use App\Repository\StreamRepository;

#[ORM\Entity(repositoryClass: StreamRepository::class)]
class Stream
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(["user", "manager"])]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(targetEntity: Channel::class, inversedBy: "streams")]
    private Channel $channel;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 255)] 
    private string $mime_type;
    
    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 50)]
    private string  $source;
    
    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 50, enumType: StreamType::class)]
    private StreamType $type;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'text')]
    private string $url;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'boolean')]
    private bool $drm = false;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'text', nullable: true)]
    private string $drm_license;

    /**
     * @return Uuid|null
     */
    public function getId(): ?Uuid
    {
        return $this->id;
    }

    /**
     * @return Channel
     */
    public function getChannel(): Channel
    {
        return $this->channel;
    }

    public function setChannel(Channel $channel): Stream
    {
        $this->channel = $channel;
        return $this;
    }

    public function getMimeType(): ?string
    {
        return $this->mime_type;
    }

    public function setMimeType(string $mime_type): Stream
    {
        $this->mime_type = $mime_type;
        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(string $source): Stream
    {
        $this->source = $source;
        return $this;
    }

    public function getType(): StreamType
    {
        return $this->type;
    }

    public function setType(StreamType $type): Stream
    {
        $this->type = $type;
        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): Stream
    {
        $this->url = $url;
        return $this;
    }

    public function isDrm(): bool
    {
        return $this->drm;
    }

    public function setDrm(bool $drm): Stream
    {
        $this->drm = $drm;
        return $this;
    }

    public function getDrmLicense(): string
    {
        return $this->drm_license;
    }

    public function setDrmLicense(string $drm_license): Stream
    {
        $this->drm_license = $drm_license;
        return $this;
    }
}