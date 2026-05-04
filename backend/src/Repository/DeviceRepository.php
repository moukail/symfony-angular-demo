<?php

namespace App\Repository;

use App\Entity\Device;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Device>
 */
class DeviceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Device::class);
    }

    public function save(Device $device): void
    {
        $this->getEntityManager()->persist($device);
        $this->getEntityManager()->flush();
    }

    public function remove(Device $device): void
    {
        $this->getEntityManager()->remove($device);
        $this->getEntityManager()->flush();
    }
}
