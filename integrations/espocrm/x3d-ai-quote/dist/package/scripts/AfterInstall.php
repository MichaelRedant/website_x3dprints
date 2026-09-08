<?php

declare(strict_types=1);

use Espo\Core\Container;
use Espo\Core\InjectableFactory;
use Espo\Core\Utils\Config;
use Espo\Core\Utils\Config\ConfigWriter;

class AfterInstall
{
    public function run(Container $container): void
    {
        $config = $container->getByClass(Config::class);
        $tabList = $config->get('tabList') ?? [];

        if (!in_array('X3dAiQuote', $tabList, true)) {
            $tabList[] = 'X3dAiQuote';
            $writer = $container
                ->getByClass(InjectableFactory::class)
                ->create(ConfigWriter::class);
            $writer->set('tabList', $tabList);
            $writer->save();
        }
    }
}
