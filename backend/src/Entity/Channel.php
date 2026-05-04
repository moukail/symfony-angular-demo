<?php
namespace App\Entity;

use App\Repository\ChannelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_NAME', fields: ['name'])]
class Channel
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(groups: ["user"])]
    private ?Uuid $id = null;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 255)]
    private string $name;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 255, enumType: ChannelType::class)]
    private ChannelType $type;
    
    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 50)]
    private string $country;
    
    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 50)]
    private string $language;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private string $website;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'text', nullable: true)]
    private string $logo;

    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'boolean')]
    private bool $active = true;
    
    #[Groups(groups: ["user"])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private readonly string $identifier;

    #[ORM\OneToMany(targetEntity: Stream::class, mappedBy: 'channel', cascade: ["persist", "remove"])]
    private Collection $streams;

    public function __construct()
    {
        $this->streams = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): Channel
    {
        $this->name = $name;
        return $this;
    }

    public function getType(): ChannelType
    {
        return $this->type;
    }

    public function setType(ChannelType $type): Channel
    {
        $this->type = $type;
        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): Channel
    {
        $this->country = $country;
        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): Channel
    {
        $this->language = $language;
        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(string $website): Channel
    {
        $this->website = $website;
        return $this;
    }

    public function getLogo(): string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): Channel
    {
        $this->logo = $logo;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): Channel
    {
        $this->active = $active;
        return $this;
    }

    public function addStream(Stream $stream): self
    {
        if (!$this->streams->contains($stream)) {
            $this->streams->add($stream);
            $stream->setChannel($this);
        }
        return $this;
    }

    public function removeStream(Stream $stream): self
    {
        if ($this->streams->contains($stream)) {
            $this->streams->removeElement($stream);
        }
        return $this;
    }

    public function getStreams(): Collection
    {
        return $this->streams;
    }

    public function getIdentifier(): string
    {
        return $this->identifier;
    }
}
