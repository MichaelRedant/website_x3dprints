<?php

declare(strict_types=1);

namespace Espo\Core\Utils {
    class Config
    {
        public function get(string $name): mixed
        {
            return match ($name) {
                'x3dOpenAiApiKey' => getenv('OPENAI_API_KEY') ?: '',
                'x3dOpenAiModel' => getenv('X3D_OPENAI_MODEL') ?: 'gpt-5.4-mini',
                default => null,
            };
        }
    }
}

namespace {
    require dirname(__DIR__) . '/files/custom/Espo/Modules/X3dAiQuote/Services/OpenAiQuoteService.php';

    $key = getenv('OPENAI_API_KEY');
    if (!is_string($key) || trim($key) === '') {
        fwrite(STDOUT, "OpenAI smoke test skipped: OPENAI_API_KEY is not set.\n");
        exit(0);
    }

    $service = new \Espo\Modules\X3dAiQuote\Services\OpenAiQuoteService(
        new \Espo\Core\Utils\Config()
    );
    $result = $service->analyze(
        'Websiteaanvraag: 2 identieke onderdelen in PLA Basic, elk 100 gram en 2 printuren. Afhaling in Herzele.'
    );

    $analysis = $result['analysis'];
    if (($analysis['printing'][0]['quantity'] ?? null) !== 2) {
        fwrite(STDERR, "OpenAI smoke test failed: quantity was not extracted.\n");
        exit(1);
    }
    if (($analysis['printing'][0]['materials'][0]['material'] ?? null) !== 'PLA_BASIC') {
        fwrite(STDERR, "OpenAI smoke test failed: material was not normalized.\n");
        exit(1);
    }

    fwrite(STDOUT, sprintf("OpenAI smoke test passed with %s.\n", $result['model']));
}
