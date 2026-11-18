<?php

namespace App\DataFixtures;

use App\Entity\Channel;
use App\Entity\ChannelType;
use App\Entity\Stream;
use App\Entity\StreamType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;

class MBCFixtures extends Fixture implements FixtureGroupInterface
{
    public static function getGroups(): array
    {
        return ['channel'];
    }

    public function load(ObjectManager $manager): void
    {
               // Al Arabiya FM
        //https://fm.alarabiya.net/fm/myStream/playlist.m3u8

        // https://api2.shahid.net/proxy/v2.1/playout/new/url/946945

        // https://api2.shahid.net/proxy/v2.1/shahid-epg-api/?csvChannelIds=387238,387286,1037534,387288,387251,387290,387937,387293,387294,1003218,946948,946938,999927,862837,995495,989622,1039070,1007223,988045,975435,992538,983124,976272,963543,969745,1005232,946945,946940,946946,946942,388567,388566,414449,1029746,951783,986014,986024,986346&from=2024-11-13T23:00:00.000Z&to=2024-11-14T22:59:59.999Z&country=NL&language=ar&Accept-Language=ar

        //////////////////////////////////////////// Al Arabiya  //////////////////////////////////////////////////////////////////
        // https://api2.shahid.net/proxy/v2.1/playout/new/url/387286

        $channel1 = (new Channel())
            ->setName('Al Arabiya')
            ->setType(ChannelType::TV)
            ->setCountry('Saoudia Arabia')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);
        
        $stream1 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8');
            
        $channel1->addStream($stream1);

        $stream2 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://59ac74c902b34be29d99e6cacd824f27.mediatailor.eu-west-1.amazonaws.com/v1/master/065e37dd36f6dc7043679a61592f17340f3617b6/bitmovin-prod-live-web-prerolls/live/bitmovin-thikrayat/8cfa8fe0c96275735745b89c683b27e3/index.m3u8?aws.manifestfilter=video_height:144-720;video_codec:H264&video_height=144-720&video_codec=H264');
            
        $channel1->addStream($stream2);

        $manager->persist($channel1);

        //////////////////////////////////////////// Al Hadath  //////////////////////////////////////////////////////////////////
        // https://api2.shahid.net/proxy/v2.1/playout/new/url/387288

        $channel2 = (new Channel())
            ->setName('Al Hadath')
            ->setType(ChannelType::TV)
            ->setCountry('Saoudia Arabia')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream3 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8');

        $channel2->addStream($stream3);

        $stream4 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://hadath-prod-dub-enc.edgenextcdn.net/out/v1/0e1a306399c346faac4226aa0858f99b/index.m3u8?aws.manifestfilter=video_height:144-720;video_codec:H264');

        $channel2->addStream($stream4);

        $manager->persist($channel2);

        //////////////////////////////////////////// Al Arabiya Business  //////////////////////////////////////////////////////////////////

        $channel3 = (new Channel())
            ->setName('Al Arabiya Business')
            ->setType(ChannelType::TV)
            ->setCountry('Saoudia Arabia')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream3 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://live.alarabiya.net/alarabiapublish/aswaaq.smil/playlist.m3u8');

        $channel3->addStream($stream3);

        $manager->persist($channel3);

        $channel4 = (new Channel())
            ->setName('Dubai Channel')
            ->setType(ChannelType::TV)
            ->setCountry('Dubai')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream4 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://dmmd-live-c-2-auth.mnc360.net/live/dmmd.stream/playlist.m3u8');

        $channel4->addStream($stream4);

        $manager->persist($channel4);

        $channel5 = (new Channel())
            ->setName('Dubai one')
            ->setType(ChannelType::TV)
            ->setCountry('Dubai')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream5 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://dmmd-live-c-2-auth.mnc360.net/live/dmmd.stream/playlist.m3u8');

        $channel5->addStream($stream5);

        $manager->persist($channel5);

        //////////////////////////////////////////// Aljazeera  //////////////////////////////////////////////////////////////////
        
        $channel6 = (new Channel())
            ->setName('الجزيرة الإخبارية')
            ->setType(ChannelType::TV)
            ->setCountry('Qatar')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream6 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://live-hls-web-aja-fa.getaj.net/AJA/index.m3u8');

        $channel6->addStream($stream6);

        $manager->persist($channel6);

        
        $channel7 = (new Channel())
            ->setName('2 الجزيرة الإخبارية')
            ->setType(ChannelType::TV)
            ->setCountry('Qatar')
            ->setLanguage('Arabic')
            ->setWebsite("")
            ->setLogo("")
            ->setActive(true);

        $stream7 = (new Stream())
            ->setMimeType('application/x-mpegURL')
            ->setSource('website')
            ->setType(StreamType::hls)
            ->setUrl('https://live-hls-web-aja2-gcp.thehlive.com/AJA2/index.m3u8');

        $channel7->addStream($stream7);

        $manager->persist($channel7);

        $manager->flush();
    }
}
