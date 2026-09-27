const fs = require('fs/promises');
const { chromium } = require('playwright');

const destination = String.raw`C:\Users\donmi\Documents\x3dprints-vault-starter\bronnen\bambu-wiki`;
const chrome = String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`;

const pages = [
  ['01-support-01-support-settings.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/support'],
  ['01-support-02-support-painting.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/support-painting'],
  ['01-support-03-support-filament-usage.pdf', 'https://wiki.bambulab.com/en/filament/support'],
  ['01-support-04-support-for-abs.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/support-for-abs'],
  ['01-support-05-pva-printing-guide.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/pva-printing-guide'],
  ['01-support-06-pla-petg-mutual-support.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/h2d-pla-and-petg-mutual-support'],
  ['02-strength-01-strength-advanced-settings.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/strength-advance-settings'],
  ['02-strength-02-fill-patterns.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/fill-patterns'],
  ['02-strength-03-wall-generator.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/wall-generator'],
  ['02-strength-04-print-settings.pdf', 'https://wiki.bambulab.com/en/bambu-studio/parameter'],
  ['02-strength-05-slicing-parameter-table.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter-table'],
  ['02-strength-06-setting-slicing-parameters.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/how-to-set-slicing-parameters'],
  ['02-strength-07-filament-slicing-parameters.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/slice-param'],
  ['03-warping-01-print-shrinkage.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/3d-prints-shrinkage'],
  ['03-warping-02-printed-model-warping.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping'],
  ['03-warping-03-warping-falling-off-collapsing.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/warping-falling-off-collapsing'],
  ['03-warping-04-chamber-temperature.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/chamber-temperature'],
  ['03-warping-05-anti-warping-discs.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/use-disc-to-avoid-warping'],
  ['04-bed-adhesion-01-build-plates.pdf', 'https://wiki.bambulab.com/en/filament-acc/acc/plates'],
  ['04-bed-adhesion-02-liquid-glue.pdf', 'https://wiki.bambulab.com/en/general/how-to-use-bbl-liquid-glue'],
  ['04-bed-adhesion-03-first-layer-not-sticking.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/first-layer-not-sticking'],
  ['04-bed-adhesion-04-first-layer-optimization-x1-p1.pdf', 'https://wiki.bambulab.com/en/x1/troubleshooting/first-layer-printing-optimization-guide'],
  ['04-bed-adhesion-05-auto-brim.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/auto-brim'],
  ['04-bed-adhesion-06-brim-ears.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/brim-ears'],
  ['05-seam-01-seam-settings-and-scarf-joint.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/Seam'],
  ['05-seam-02-seam-defects.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/seam'],
  ['06-orientation-01-auto-orientation.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/auto-orientation'],
  ['06-orientation-02-lay-on-face.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/lay-on-face'],
  ['07-calibration-01-flow-rate.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate'],
  ['07-calibration-02-flow-dynamics-pressure-advance.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa'],
  ['07-calibration-03-printer-calibration.pdf', 'https://wiki.bambulab.com/en/general/printer-calibration'],
  ['07-calibration-04-automatic-flow-microlidar.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/flowrate-calibration-by-microlidar'],
  ['08-ams-01-compatible-spools-and-filaments.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/notes-AMS'],
  ['08-ams-02-functions-and-workflow.pdf', 'https://wiki.bambulab.com/en/ams/manual/ams-function-introduction'],
  ['08-ams-03-humidity-detection.pdf', 'https://wiki.bambulab.com/en/ams/manual/humidity-detection-function'],
  ['08-ams-04-multi-model-compatibility.pdf', 'https://wiki.bambulab.com/en/ams/manual/multi-model-AMS-compatibility-guide'],
  ['08-ams-05-tpu-printing-guide.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/tpu-printing-guide'],
  ['08-ams-06-desiccant-status.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/desiccant-status'],
  ['08-ams-07-filament-drying.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/dry-filament'],
  ['08-ams-08-material-compatibility-table.pdf', 'https://wiki.bambulab.com/en/general/filament-guide-material-table'],
  ['09-nozzles-01-nozzle-guide.pdf', 'https://wiki.bambulab.com/en/filament-acc/acc/nozzles'],
  ['09-nozzles-02-0-2mm-nozzle-faq.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/02-mm-nozzle-FAQ'],
  ['10-laser-cutting-01-topic-overview.pdf', 'https://wiki.bambulab.com/en/laser-cutting-module'],
  ['10-laser-cutting-02-laser-safety.pdf', 'https://wiki.bambulab.com/en/h2/laser-safety-document'],
  ['10-laser-cutting-03-processable-materials.pdf', 'https://wiki.bambulab.com/en/h2/laser/processable-materials-list'],
  ['10-laser-cutting-04-important-laser-information.pdf', 'https://wiki.bambulab.com/en/h2/manual/imp-info-laser'],
  ['10-laser-cutting-05-laser-faq.pdf', 'https://wiki.bambulab.com/en/h2/manual/laser-faq'],
  ['10-laser-cutting-06-focus-calibration.pdf', 'https://wiki.bambulab.com/en/h2/manual/laser-focus-calibration-intro'],
  ['10-laser-cutting-07-laser-and-cutting-platforms.pdf', 'https://wiki.bambulab.com/en/h2/manual/laser-platform-cutting-platform-use-intro'],
  ['10-laser-cutting-08-components-and-workflow.pdf', 'https://wiki.bambulab.com/en/h2/manual/laser-setup'],
  ['10-laser-cutting-09-place-laser-material.pdf', 'https://wiki.bambulab.com/en/h2/manual/placement-of-laser-materials'],
  ['10-laser-cutting-10-laser-materials-guide.pdf', 'https://wiki.bambulab.com/en/laser/material/types-and-examples-intro'],
  ['10-laser-cutting-11-plywood-bending.pdf', 'https://wiki.bambulab.com/en/laser/material/bent-plywood-solution'],
  ['10-laser-cutting-12-batch-engraving-jigs.pdf', 'https://wiki.bambulab.com/en/laser/material/how-to-use-laser-jigs-for-batch-engraving'],
  ['10-laser-cutting-13-cleaning-tips.pdf', 'https://wiki.bambulab.com/en/h2/laser/maintenance/real-case-and-cleaning-tips'],
  ['10-laser-cutting-14-bambu-suite-manual.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual'],
  ['10-laser-cutting-15-bambu-suite-quick-start.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/quick-start-guide'],
  ['10-laser-cutting-16-2d-processing-types.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/2d-processing-type-intro'],
  ['10-laser-cutting-17-material-thickness-measurement.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/material-thickness-measurement'],
  ['10-laser-cutting-18-auto-thickness-measurement.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/auto-thickness-measuring-and-troubleshooting'],
  ['10-laser-cutting-19-color-selection.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/color-selection-tool'],
  ['10-laser-cutting-20-attach-and-group.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/attach-and-group'],
  ['10-laser-cutting-21-auto-arrange.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/auto-arrange'],
  ['10-laser-cutting-22-sticker-tool.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/sticker-tool'],
  ['10-laser-cutting-23-mixed-processes-on-one-plate.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/composability-of-different-process-types-processed-on-same-plate'],
  ['10-laser-cutting-24-curved-surface-engraving.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/surface-engraving'],
  ['10-laser-cutting-25-batch-engraving.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/manual/batch-engraving'],
  ['10-laser-cutting-26-laser-quality-troubleshooting.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/troubleshooting/laser-processing-quality-issues'],
  ['10-laser-cutting-27-cutting-module-faq.pdf', 'https://wiki.bambulab.com/en/h2/manual/cutting-module'],
  ['10-laser-cutting-28-place-cutting-material.pdf', 'https://wiki.bambulab.com/en/h2/manual/placement-of-cutting-materials'],
  ['10-laser-cutting-29-print-then-cut.pdf', 'https://wiki.bambulab.com/en/h2/manual/post-printing-cutting'],
  ['10-laser-cutting-30-cutting-materials-guide.pdf', 'https://wiki.bambulab.com/en/h2/blade-cutter/material/types-and-examples-intro'],
  ['10-laser-cutting-31-heat-transfer-vinyl.pdf', 'https://wiki.bambulab.com/en/h2/blade-cutter/material/use-heat-transfer-vinyl'],
  ['10-laser-cutting-32-drawing-pen-suggestions.pdf', 'https://wiki.bambulab.com/en/h2/blade-cutter/manual/drawing-pen-suggestions'],
  ['10-laser-cutting-33-cutting-quality-troubleshooting.pdf', 'https://wiki.bambulab.com/en/h2/blade-cutter/troubleshooting/cutting-and-drawing-quality-troubleshooting'],
  ['10-laser-cutting-34-cutting-module-assist-tool.pdf', 'https://wiki.bambulab.com/en/h2/manual/cutting-module-assist-tool'],
  ['10-laser-cutting-35-bambu-studio-cut-tool.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/cut-tool'],
  ['11-print-quality-01-common-problems-overview.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem'],
  ['11-print-quality-02-stringing-and-oozing.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/stringing-oozing'],
  ['11-print-quality-03-bridging.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/bridging'],
  ['11-print-quality-04-overhangs.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/overhang'],
  ['11-print-quality-05-under-extrusion.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/under-extrusion'],
  ['11-print-quality-06-clogging.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/clog'],
  ['11-print-quality-07-spaghetti.pdf', 'https://wiki.bambulab.com/en/filament-acc/filament/print-quality/spaghetti'],
  ['11-print-quality-08-layer-shifts.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/layer-shifts'],
  ['11-print-quality-09-spaghetti-detection.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/Spaghetti_detection'],
  ['11-print-quality-10-avoiding-nozzle-clogs.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/how_to_avoid_nozzle_clogs'],
  ['11-print-quality-11-slow-down-for-overhangs.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/slow-down-for-overhang'],
  ['12-slicer-advanced-01-adaptive-layer-height.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/adaptive-layer-height'],
  ['12-slicer-advanced-02-layer-height.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/layer-height'],
  ['12-slicer-advanced-03-line-width.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/line-width'],
  ['12-slicer-advanced-04-retraction.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/retraction'],
  ['12-slicer-advanced-05-ironing.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/ironing'],
  ['12-slicer-advanced-06-fuzzy-skin.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/fuzzy-skin'],
  ['12-slicer-advanced-07-spiral-vase-mode.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/spiral-vase'],
  ['13-multicolor-01-color-painting.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/color-painting-tool'],
  ['13-multicolor-02-multicolor-printing.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/multi-color-printing'],
  ['13-multicolor-03-filament-mapping.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/filament-mapping-principle'],
  ['13-multicolor-04-prime-tower.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/prime-tower'],
  ['13-multicolor-05-filament-sequence-by-layer.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/parameter/filament-sequence-for-different-layers'],
  ['13-multicolor-06-reducing-filament-change-waste.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/reduce-wasting-during-filament-change'],
  ['13-multicolor-07-purged-filament-waste.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/handling-purged-filament-waste'],
  ['13-multicolor-08-external-spool-multicolor.pdf', 'https://wiki.bambulab.com/en/bambu-studio/multi_color_with_external'],
  ['14-maintenance-01-maintenance-overview.pdf', 'https://wiki.bambulab.com/en/general/maintenance'],
  ['14-maintenance-02-lubricants-grease-and-oil.pdf', 'https://wiki.bambulab.com/en/filament-acc/acc/lubricant-grease-oil'],
  ['14-maintenance-03-carbon-rods-clearance.pdf', 'https://wiki.bambulab.com/en/general/carbon-rods-clearance'],
  ['14-maintenance-04-lead-screw-lubrication.pdf', 'https://wiki.bambulab.com/en/general/lead-screws-lubrication'],
  ['14-maintenance-05-replacing-xy-belts.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/replace_the_xy_belts'],
  ['14-maintenance-06-x1-basic-maintenance.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/basic-maintenance'],
  ['14-maintenance-07-x1-belt-tension.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/belt-tension'],
  ['14-maintenance-08-x1-replace-extruder.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/replace-extruder'],
  ['14-maintenance-09-x1-replace-hotend.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/replace-hotend'],
  ['14-maintenance-10-x1-replace-ptfe-tube.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/replace-ptfe-tube'],
  ['14-maintenance-11-x1-replace-carbon-rods.pdf', 'https://wiki.bambulab.com/en/x1/maintenance/replace-the-x-carbon-rods'],
  ['14-maintenance-12-p1-extruder-cleaning.pdf', 'https://wiki.bambulab.com/en/p1/maintenance/extruder-cleaning-guide'],
  ['14-maintenance-13-h2-periodic-maintenance.pdf', 'https://wiki.bambulab.com/en/h2/maintenance/period-maintenance'],
  ['14-maintenance-14-h2-x-axis-lubrication.pdf', 'https://wiki.bambulab.com/en/h2/maintenance/x-axis-lubrication'],
  ['14-maintenance-15-a1-basic-maintenance.pdf', 'https://wiki.bambulab.com/en/a1/maintenance/basic-maintenance'],
  ['15-hms-troubleshooting-01-technical-issue-types.pdf', 'https://wiki.bambulab.com/en/general/technical-issue-type'],
  ['15-hms-troubleshooting-02-printing-issues-overview.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/troubleshooting-printing-issues'],
  ['15-hms-troubleshooting-03-hms-introduction.pdf', 'https://wiki.bambulab.com/en/x1/troubleshooting/intro-hms'],
  ['15-hms-troubleshooting-04-x1-troubleshooting-index.pdf', 'https://wiki.bambulab.com/en/x1/troubleshooting'],
  ['15-hms-troubleshooting-05-p1-troubleshooting-index.pdf', 'https://wiki.bambulab.com/en/p1/troubleshooting'],
  ['15-hms-troubleshooting-06-a1-troubleshooting-index.pdf', 'https://wiki.bambulab.com/en/a1/troubleshooting'],
  ['15-hms-troubleshooting-07-h2-troubleshooting-index.pdf', 'https://wiki.bambulab.com/en/h2/troubleshooting'],
  ['16-camera-network-01-printer-network-ports.pdf', 'https://wiki.bambulab.com/en/general/printer-network-ports'],
  ['16-camera-network-02-enable-lan-mode.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/enable-lan-mode'],
  ['16-camera-network-03-timelapse-storage-and-video.pdf', 'https://wiki.bambulab.com/en/knowledge-sharing/timelapse-internal-storage-and-video-management'],
  ['16-camera-network-04-live-view.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/faq/live-view'],
  ['16-camera-network-05-remote-control.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/remote-control'],
  ['16-camera-network-06-timelapse-overview.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/Timelapse'],
  ['16-camera-network-07-timelapse-a-series.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/timelapse-a-series'],
  ['16-camera-network-08-timelapse-x1-p1.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/timelapse-xp-series'],
  ['16-camera-network-09-virtual-camera.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/virtual-camera'],
  ['16-camera-network-10-control-from-bambu-handy.pdf', 'https://wiki.bambulab.com/en/x1/manual/ctrl-monitor-on-app'],
  ['16-camera-network-11-x1-network-connection.pdf', 'https://wiki.bambulab.com/en/x1/manual/x1-network-connection-guide'],
  ['16-camera-network-12-h2d-network-connection.pdf', 'https://wiki.bambulab.com/en/h2/manual/h2d-network-connection-guide'],
  ['17-platform-software-01-makerworld-upload-models.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/how-to-upload-models'],
  ['17-platform-software-02-makerworld-upload-guidelines.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/model-upload-guidelines'],
  ['17-platform-software-03-makerworld-print-profiles.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/print-profile-upload'],
  ['17-platform-software-04-makerworld-exclusive-models.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/exclusive-model-guideline'],
  ['17-platform-software-05-makerworld-featured-models.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/featured-model-guidelines'],
  ['17-platform-software-06-makerworld-ip-reporting.pdf', 'https://wiki.bambulab.com/en/makerworld/tutorials/IP-Report-FAQ'],
  ['17-platform-software-07-makerworld-release-notes.pdf', 'https://wiki.bambulab.com/en/makerworld/release-note/makerworld-release-notes'],
  ['17-platform-software-08-x1-firmware-update.pdf', 'https://wiki.bambulab.com/en/x1/manual/firmware-upgrading'],
  ['17-platform-software-09-p1-firmware-update.pdf', 'https://wiki.bambulab.com/en/p1/manual/firmware-upgrading'],
  ['17-platform-software-10-h2-firmware-update.pdf', 'https://wiki.bambulab.com/en/h2/software/firmware-update'],
  ['17-platform-software-11-firmware-open-beta.pdf', 'https://wiki.bambulab.com/en/software/bambu-firmware-open-beta'],
  ['17-platform-software-12-bambu-studio-release-notes.pdf', 'https://wiki.bambulab.com/en/software/bambu-studio/release'],
  ['17-platform-software-13-bambu-suite-release-notes.pdf', 'https://wiki.bambulab.com/en/software/bambu-suite/release-notes'],
  ['17-platform-software-14-bambu-farm-manager.pdf', 'https://wiki.bambulab.com/en/software/bambu-farm-manager'],
  ['17-platform-software-15-bambu-farm-features.pdf', 'https://wiki.bambulab.com/en/software/bambu-farm-features'],
  ['17-platform-software-16-bambu-farm-faq.pdf', 'https://wiki.bambulab.com/en/software/bambu-farm-faq-troubleshoot'],
  ['17-platform-software-17-bambu-farm-troubleshooting.pdf', 'https://wiki.bambulab.com/en/software/bambu-farm-troubleshoot'],
  ['17-platform-software-18-bambu-farm-release-notes.pdf', 'https://wiki.bambulab.com/en/software/bambu-farm-release-notes'],
];

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

async function load(page, url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
      await page.waitForTimeout(1200);
      await page.evaluate(() => {
        for (const selector of ['#consent-banner', '#truste-consent-track', '.trustarc-banner-wrapper']) {
          for (const element of document.querySelectorAll(selector)) {
            element.style.setProperty('display', 'none', 'important');
          }
        }
        for (const button of document.querySelectorAll('button')) {
          if (!/reject all/i.test(button.textContent || '')) continue;
          let container = button;
          while (container && container.parentElement) {
            const text = container.textContent || '';
            if (/we use cookies/i.test(text) && /customize settings/i.test(text)) {
              container.style.setProperty('display', 'none', 'important');
              break;
            }
            container = container.parentElement;
          }
        }
      });
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await page.waitForTimeout(1500 * attempt);
    }
  }
  throw lastError;
}

(async () => {
  await fs.mkdir(destination, { recursive: true });
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  const prefix = process.argv[2] || '';
  const prefixes = prefix.split(',').filter(Boolean);
  const selectedPages = prefixes.length
    ? pages.filter(([filename]) => prefixes.some((item) => filename.startsWith(item)))
    : pages;

  for (let index = 0; index < selectedPages.length; index += 1) {
    const [filename, url] = selectedPages[index];
    await load(page, url);

    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 850) {
        window.scrollTo(0, y);
        await delay(60);
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    await page.emulateMedia({ media: 'print' });

    const title = (await page.title()).replace(/\s*\|\s*Bambu Lab Wiki\s*$/i, '');
    const path = `${destination}\\${filename}`;
    await page.pdf({
      path,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      margin: { top: '18mm', right: '12mm', bottom: '18mm', left: '12mm' },
      headerTemplate: `<div style="width:100%;font-size:8px;color:#555;padding:0 12mm;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(title)} — Bambu Lab Wiki</div>`,
      footerTemplate: `<div style="width:100%;font-size:7px;color:#666;padding:0 12mm;display:flex;justify-content:space-between;gap:12px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(url)}</span><span style="white-space:nowrap"><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`,
      preferCSSPageSize: false,
    });
    console.log(`[${index + 1}/${selectedPages.length}] ${filename}`);
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
