<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

use App\Entity\Playlist;
use App\Entity\M3u;
use App\Entity\Xtream;
use App\Entity\Device;
use App\Model\M3uDto;
use App\Model\XtreamDto;

class PlaylistRepository extends ServiceEntityRepository
{
    public function __construct(
        ManagerRegistry $registry,
        private readonly DeviceRepository $deviceRepository,
    ) {
        parent::__construct($registry, Playlist::class);
    }

    public function saveM3u(M3uDto $model): M3u
    {
        $device = $this->getOrCreateDevice($model->macAddress);

        $m3u = new M3u();
        $m3u
            ->setUrl($model->url)
            ->setName($model->name)
            ->setDevice($device);

        $this->getEntityManager()->persist($m3u);
        $this->getEntityManager()->flush();
        return $m3u;
    }

    public function saveXtream(XtreamDto $model): Xtream
    {
        $device = $this->getOrCreateDevice($model->macAddress);

        $xtream = new Xtream();
        $xtream
            ->setUrl($model->url)
            ->setName($model->name)
            ->setUsername($model->username)
            ->setPassword($model->password)
            ->setDevice($device);

        $this->getEntityManager()->persist($xtream);
        $this->getEntityManager()->flush();
        return $xtream;
    }

    private function getOrCreateDevice(string $macAddress): Device
    {
        $device = $this->deviceRepository->findOneBy(['macAddress' => $macAddress]);
        if (!$device) {
            $device = new Device();
            $device->setMacAddress($macAddress);
            $this->deviceRepository->save($device);
        }
        return $device;
    }
}
