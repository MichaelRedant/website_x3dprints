define(['views/record/panels/bottom'], (BottomPanelView) => {
    return class extends BottomPanelView {
        templateContent = `
            <div class="x3d-ai-quote-assistant">
                <div class="alert alert-info">
                    <strong>Gecontroleerde conceptofferte.</strong>
                    De aanvraagtekst wordt bij <em>Offerte maken</em> naar OpenAI gestuurd zonder API-opslag
                    (<code>store: false</code>). Verwijder persoonsgegevens die niet nodig zijn.
                    Bedragen komen uitsluitend uit de vaste X3DPrints-prijsregels en niets wordt automatisch verzonden.
                </div>

                <div class="form-group">
                    <label for="x3d-ai-source-{{cid}}">Aanvraagtekst</label>
                    <textarea id="x3d-ai-source-{{cid}}" class="form-control" data-field="sourceText" rows="8">{{sourceText}}</textarea>
                </div>

                <div class="form-group">
                    <label for="x3d-ai-corrections-{{cid}}">Slicerdata, prijsinstructies en correcties</label>
                    <textarea id="x3d-ai-corrections-{{cid}}" class="form-control" data-field="corrections" rows="6"
                        placeholder="Voorbeeld: PETG 543 g aan 25,99/kg; PLA Wood 95 g aan 27,99/kg; 19,6 uur op 2 kW; 6 printjobs; CAD vaste prijs 100; productie afronden op 105; verzending optioneel 7,50.">{{corrections}}</textarea>
                    <p class="help-block">Expliciete waarden hier hebben voorrang. Onbekende cijfers worden nooit door AI ingevuld.</p>
                </div>

                <div class="form-group">
                    <label for="x3d-ai-commercial-total-{{cid}}">Commerciële eindprijs basisofferte (EUR)</label>
                    <input id="x3d-ai-commercial-total-{{cid}}" type="number" min="0.01" step="0.01"
                        class="form-control" data-field="commercialTotal" value="{{commercialTotal}}"
                        placeholder="Leeg laten voor de berekende verkoopprijs">
                    <p class="help-block">
                        Optioneel. Gebruik dit alleen voor een bewuste projectprijs, bijvoorbeeld 45,00 EUR.
                        De berekende prijs en het verschil blijven zichtbaar in de interne controle.
                    </p>
                </div>

                <div class="btn-group" role="group" aria-label="AI-offerteacties">
                    <button type="button" class="btn btn-primary" data-action="analyze" {{#if busy}}disabled{{/if}}>
                        {{#if busy}}Offerte wordt gemaakt...{{else}}Offerte maken{{/if}}
                    </button>
                    {{#if quote}}
                    {{#unless savedRecord}}
                    <button type="button" class="btn btn-success" data-action="save" {{#unless quote.canSave}}disabled{{/unless}}>
                        Offerte en project opslaan
                    </button>
                    {{/unless}}
                    {{#if savedRecord}}
                    <button type="button" class="btn btn-default" data-action="syncProject" {{#if busy}}disabled{{/if}}>
                        {{projectActionLabel}}
                    </button>
                    {{/if}}
                    {{/if}}
                </div>

                {{#if statusMessage}}
                <div class="alert {{statusClass}}" style="margin-top: 12px;">{{statusMessage}}</div>
                {{/if}}

                {{#if quote}}
                <hr>
                <div class="row">
                    <div class="col-md-8">
                        <h4>{{analysis.quoteTitle}}</h4>
                        <p>{{analysis.requestSummary}}</p>
                    </div>
                    <div class="col-md-4 text-right">
                        {{#if quote.hasCommercialAdjustment}}
                        <div class="text-muted">Berekend: {{quote.calculatedTotalExclVatFormatted}} EUR</div>
                        {{/if}}
                        <div><strong>{{quote.totalExclVatFormatted}} EUR</strong> basisofferte</div>
                        {{#if quote.hasOptions}}<div>{{quote.totalWithOptionsFormatted}} EUR met alle opties</div>{{/if}}
                        {{#if quote.hasOptionalDelivery}}<div>+ {{quote.optionalDeliveryCostFormatted}} EUR optionele verzending</div>{{/if}}
                        <div class="text-muted small">Btw-vrijstellingsregeling</div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Offertepost</th>
                                <th>Aantal</th>
                                <th class="text-right">Eenheidsprijs</th>
                                <th class="text-right">Totaal excl. btw</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{#each quote.lineItems}}
                            <tr>
                                <td>{{pricingRoleLabel}}</td>
                                <td>
                                    <strong>{{description}}</strong>
                                    {{#if details}}<div class="text-muted small">{{details}}</div>{{/if}}
                                </td>
                                <td>{{quantity}}</td>
                                <td class="text-right">{{unitPriceFormatted}} EUR</td>
                                <td class="text-right">{{totalFormatted}} EUR</td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                </div>

                {{#if quote.missingInformation.length}}
                <div class="alert alert-warning">
                    <strong>Nog te bevestigen voor een definitieve offerte:</strong>
                    <ul>
                        {{#each quote.missingInformation}}<li>{{this}}</li>{{/each}}
                    </ul>
                </div>
                {{else}}
                <div class="alert alert-success">
                    Alle vereiste prijsgegevens zijn aanwezig. Controleer de berekening en tekst voor verzending.
                </div>
                {{/if}}

                <div class="form-group">
                    <label for="x3d-ai-internal-text-{{cid}}">Interne berekening en commerciële controle</label>
                    <textarea id="x3d-ai-internal-text-{{cid}}" class="form-control" data-field="internalText" rows="16">{{quote.internalText}}</textarea>
                    <p class="help-block">Ruwe materiaal-, stroom- en dryingberekening. Deze tekst is niet voor de klant.</p>
                </div>

                <div class="form-group">
                    <label for="x3d-ai-customer-subject-{{cid}}">Onderwerp klantmail ({{quote.customerLanguageLabel}})</label>
                    <input id="x3d-ai-customer-subject-{{cid}}" class="form-control" data-field="customerSubject" value="{{quote.customerSubject}}">
                </div>

                <div class="form-group">
                    <label for="x3d-ai-customer-text-{{cid}}">Klantklare e-mail</label>
                    <textarea id="x3d-ai-customer-text-{{cid}}" class="form-control" data-field="customerText" rows="20">{{quote.customerText}}</textarea>
                    <p class="help-block">De taal volgt de klantaanvraag. Bedragen komen uitsluitend uit de berekening hierboven.</p>
                    <button type="button" class="btn btn-default" data-action="copyCustomerMail">Kopieer klantmail</button>
                </div>

                <div class="form-group">
                    <label for="x3d-ai-project-summary-{{cid}}">CRM-projectsamenvatting</label>
                    <textarea id="x3d-ai-project-summary-{{cid}}" class="form-control" data-field="projectSummary" rows="12">{{projectDraft.summary}}</textarea>
                    <p class="help-block">
                        Bij het opslaan worden deze samenvatting en de berekende productievelden meteen in het gekoppelde Opportunity-project gezet.
                    </p>
                </div>
                {{/if}}

                {{#if savedRecord}}
                <div class="alert alert-success">
                    Concept opgeslagen: <a href="#X3dAiQuote/view/{{savedRecord.id}}">{{savedRecord.name}}</a>.
                    Er is geen e-mail verstuurd.
                </div>
                {{/if}}
                {{#if projectRecord}}
                <div class="alert alert-success">
                    Project bijgewerkt: <a href="#Opportunity/view/{{projectRecord.id}}">{{projectRecord.name}}</a>.
                </div>
                {{/if}}
            </div>
        `

        events = {
            'click [data-action="analyze"]': 'actionAnalyze',
            'click [data-action="save"]': 'actionSave',
            'click [data-action="syncProject"]': 'actionSyncProject',
            'input [data-field="sourceText"]': 'captureSourceText',
            'input [data-field="corrections"]': 'captureCorrections',
            'input [data-field="commercialTotal"]': 'captureCommercialTotal',
            'input [data-field="internalText"]': 'captureInternalText',
            'input [data-field="customerSubject"]': 'captureCustomerSubject',
            'input [data-field="customerText"]': 'captureCustomerText',
            'input [data-field="projectSummary"]': 'captureProjectSummary',
            'click [data-action="copyCustomerMail"]': 'actionCopyCustomerMail',
        }

        setup() {
            super.setup();

            this.scope = this.model.entityType || this.model.name || 'Lead';
            this.sourceText = this.buildInitialSourceText();
            this.corrections = '';
            this.commercialTotal = '';
            this.result = null;
            this.savedRecord = null;
            this.projectRecord = null;
            this.accountRecord = null;
            this.relatedLeadRecord = null;
            this.busy = false;
            this.statusMessage = '';
            this.statusClass = 'alert-info';
        }

        data() {
            const analysis = this.result ? this.result.analysis : null;
            const quote = this.result ? this.prepareQuote(this.result.quote) : null;
            const projectId = this.resolveProjectId();

            return {
                cid: this.cid,
                sourceText: this.sourceText,
                corrections: this.corrections,
                commercialTotal: this.commercialTotal,
                analysis,
                quote,
                projectDraft: this.result ? this.result.projectDraft : null,
                projectActionLabel: projectId ? 'Gekoppeld project bijwerken' : 'Nieuw project aanmaken',
                busy: this.busy,
                statusMessage: this.statusMessage,
                statusClass: this.statusClass,
                savedRecord: this.savedRecord,
                projectRecord: this.projectRecord,
            };
        }

        buildInitialSourceText() {
            const parts = [];
            const recordName = this.model.get('name');
            const description = this.model.get('description');
            const importSummary = this.model.get('summary');
            const parsedPayload = this.model.get('parsedPayload');
            const emailBody = this.model.get('bodyPlain') || this.stripHtml(this.model.get('body'));
            const sender = this.model.get('fromName') || this.model.get('fromString') || this.model.get('from');

            if (recordName) {
                parts.push(`Onderwerp: ${recordName}`);
            }
            if (description) {
                parts.push(`Aanvraag:\n${description}`);
            }
            if (importSummary) {
                parts.push(`X3DImport-samenvatting:\n${importSummary}`);
            }
            if (parsedPayload) {
                parts.push(`X3DImport-data:\n${parsedPayload}`);
            }
            if (this.scope === 'Email' && sender) {
                parts.push(`Afzender: ${sender}`);
            }
            if (this.scope === 'Email' && emailBody) {
                parts.push(`Aanvraag per e-mail:\n${emailBody}`);
            }

            return parts.join('\n\n');
        }

        captureSourceText(event) {
            this.sourceText = event.currentTarget.value;
        }

        captureCorrections(event) {
            this.corrections = event.currentTarget.value;
        }

        captureCommercialTotal(event) {
            this.commercialTotal = event.currentTarget.value;
        }

        captureCustomerText(event) {
            if (this.result) {
                this.result.quote.customerText = event.currentTarget.value;
            }
        }

        captureInternalText(event) {
            if (this.result) {
                this.result.quote.internalText = event.currentTarget.value;
            }
        }

        captureCustomerSubject(event) {
            if (this.result) {
                this.result.quote.customerSubject = event.currentTarget.value;
            }
        }

        captureProjectSummary(event) {
            if (this.result && this.result.projectDraft) {
                this.result.projectDraft.summary = event.currentTarget.value;
            }
        }

        async actionAnalyze() {
            this.captureCurrentValues();
            this.busy = true;
            this.savedRecord = null;
            this.projectRecord = null;
            this.statusMessage = 'De aanvraag wordt gestructureerd en daarna met vaste prijsregels berekend.';
            this.statusClass = 'alert-info';
            await this.reRender();

            try {
                this.result = await Espo.Ajax.postRequest('X3dAiQuote/analyze', {
                    sourceText: this.sourceText,
                    corrections: this.corrections,
                    commercialTotal: this.commercialTotal,
                    sourceRecordType: this.scope,
                    sourceRecordId: this.model.id,
                }, {timeout: 120000});
                this.statusMessage = this.result.quote.readyForReview
                    ? 'Analyse gereed. Controleer prijsregels en klanttekst.'
                    : 'Concept gemaakt. Vul de gemarkeerde gegevens aan en analyseer opnieuw.';
                this.statusClass = this.result.quote.readyForReview ? 'alert-success' : 'alert-warning';
            } catch (xhr) {
                this.statusMessage = this.readError(xhr);
                this.statusClass = 'alert-danger';
            } finally {
                this.busy = false;
                await this.reRender();
            }
        }

        async actionSave() {
            if (!this.result || !this.result.quote.canSave) {
                return;
            }

            this.captureCurrentValues();
            this.busy = true;
            this.statusMessage = 'Offerte en project worden gekoppeld aan dit CRM-record.';
            this.statusClass = 'alert-info';
            await this.reRender();

            try {
                const payload = this.buildSavePayload();
                const record = await Espo.Ajax.postRequest('X3dAiQuote', payload);
                this.savedRecord = {id: record.id, name: record.name || payload.name};
            } catch (xhr) {
                this.statusMessage = this.readError(xhr);
                this.statusClass = 'alert-danger';
                this.busy = false;
                await this.reRender();
                return;
            }

            try {
                await this.syncProjectRecord();
                this.statusMessage = 'Offerteconcept en project opgeslagen. Er is niets naar de klant verzonden.';
                this.statusClass = 'alert-success';
            } catch (xhr) {
                this.statusMessage = `Het offerteconcept is opgeslagen, maar het project kon niet worden bijgewerkt. Gebruik de projectknop om opnieuw te proberen. ${this.readError(xhr)}`;
                this.statusClass = 'alert-warning';
            } finally {
                this.busy = false;
                await this.reRender();
            }
        }

        async actionSyncProject() {
            if (!this.result || !this.savedRecord || !this.result.projectDraft) {
                return;
            }

            this.captureCurrentValues();
            this.busy = true;
            const existingProjectId = this.resolveProjectId();
            this.statusMessage = existingProjectId
                ? 'Het gekoppelde project wordt met de gecontroleerde offertegegevens bijgewerkt.'
                : 'Er wordt een nieuw project met de gecontroleerde offertegegevens aangemaakt.';
            this.statusClass = 'alert-info';
            await this.reRender();

            try {
                await this.syncProjectRecord();
                this.statusMessage = 'Projectgegevens bijgewerkt. De klantmail is niet verzonden.';
                this.statusClass = 'alert-success';
            } catch (xhr) {
                this.statusMessage = this.readError(xhr);
                this.statusClass = 'alert-danger';
            } finally {
                this.busy = false;
                await this.reRender();
            }
        }

        async syncProjectRecord() {
            const fields = {...this.result.projectDraft.fields};
            const summary = this.result.projectDraft.summary || '';
            const existingProjectId = this.resolveProjectId();
            let project;
            let current = null;

            if (existingProjectId) {
                current = this.scope === 'Opportunity' && this.model.id === existingProjectId
                    ? this.model.attributes
                    : await Espo.Ajax.getRequest(`Opportunity/${existingProjectId}`);
            }

            const account = await this.resolveAccountRecord(current);
            if (account) {
                fields.accountId = account.id;
                fields.accountName = account.name;
            }

            if (existingProjectId) {
                fields.description = this.mergeProjectDescription(current.description || '', summary);
                const response = await Espo.Ajax.patchRequest(`Opportunity/${existingProjectId}`, fields);
                project = {
                    id: existingProjectId,
                    name: response && response.name ? response.name : fields.name,
                };
            } else {
                fields.description = summary;
                const assignedUserId = this.model.get('assignedUserId');
                if (assignedUserId) {
                    fields.assignedUserId = assignedUserId;
                    fields.assignedUserName = this.model.get('assignedUserName') || '';
                }
                project = await Espo.Ajax.postRequest('Opportunity', fields);
            }

            const projectName = project.name || fields.name;
            // Bewaar dit meteen, zodat een mislukte quote-link bij opnieuw proberen geen dubbel project maakt.
            this.projectRecord = {id: project.id, name: projectName};
            await Espo.Ajax.patchRequest(`X3dAiQuote/${this.savedRecord.id}`, {
                opportunityId: project.id,
                opportunityName: projectName,
                projectSummary: summary,
            });

            return this.projectRecord;
        }

        async resolveAccountRecord(currentProject = null) {
            if (this.accountRecord && this.accountRecord.id) {
                return this.accountRecord;
            }

            const currentAccountId = currentProject && currentProject.accountId;
            if (currentAccountId) {
                this.accountRecord = {
                    id: currentAccountId,
                    name: currentProject.accountName || '',
                };
                return this.accountRecord;
            }

            const directAccountId = this.model.get('accountId');
            if (directAccountId) {
                this.accountRecord = {
                    id: directAccountId,
                    name: this.model.get('accountName') || '',
                };
                return this.accountRecord;
            }

            if (this.scope === 'Email' && this.model.get('parentType') === 'Account') {
                this.accountRecord = {
                    id: this.model.get('parentId'),
                    name: this.model.get('parentName') || '',
                };
                return this.accountRecord;
            }

            if (this.scope === 'Email' && this.model.get('parentType') === 'Contact') {
                const contact = await Espo.Ajax.getRequest(`Contact/${this.model.get('parentId')}`);
                if (contact.accountId) {
                    this.accountRecord = {
                        id: contact.accountId,
                        name: contact.accountName || '',
                    };
                    return this.accountRecord;
                }
            }

            const relatedLead = await this.resolveRelatedLead();

            const accountName = this.resolveAccountName();
            if (!accountName) {
                return null;
            }

            const contactData = this.resolveCustomerContactData();
            let account = contactData.emailAddress
                ? await this.findExactAccount('emailAddress', contactData.emailAddress)
                : null;
            account = account || await this.findExactAccount('name', accountName);

            if (!account) {
                account = await Espo.Ajax.postRequest('Account', {
                    name: accountName,
                    x3dBusinessCustomer: this.resolveBusinessCustomer(),
                    ...contactData,
                });
            }

            this.accountRecord = {id: account.id, name: account.name || accountName};

            if (relatedLead && relatedLead.accountName !== this.accountRecord.name) {
                await Espo.Ajax.patchRequest(`Lead/${relatedLead.id}`, {accountName: this.accountRecord.name});
                relatedLead.accountName = this.accountRecord.name;

                if (this.scope === 'Lead') {
                    this.model.set('accountName', this.accountRecord.name);
                }
            }

            return this.accountRecord;
        }

        async resolveRelatedLead() {
            if (this.relatedLeadRecord) {
                return this.relatedLeadRecord;
            }

            if (this.scope === 'Lead') {
                this.relatedLeadRecord = {id: this.model.id, ...this.model.attributes};
                return this.relatedLeadRecord;
            }

            if (this.scope === 'Email' && this.model.get('parentType') === 'Lead') {
                this.relatedLeadRecord = await Espo.Ajax.getRequest(`Lead/${this.model.get('parentId')}`);
                return this.relatedLeadRecord;
            }

            return null;
        }

        async findExactAccount(attribute, value) {
            const response = await Espo.Ajax.getRequest('Account', {
                where: [{type: 'equals', attribute, value}],
                maxSize: 2,
            });
            const matches = response && Array.isArray(response.list) ? response.list : [];
            const normalizedValue = String(value).trim().toLocaleLowerCase('nl-BE');

            return matches.find(item =>
                String(item[attribute] || '').trim().toLocaleLowerCase('nl-BE') === normalizedValue
            ) || matches[0] || null;
        }

        resolveCustomerContactData() {
            const fieldMap = {
                emailAddress: ['emailAddress'],
                phoneNumber: ['phoneNumber'],
                billingAddressStreet: ['addressStreet'],
                billingAddressCity: ['addressCity'],
                billingAddressPostalCode: ['addressPostalCode'],
                billingAddressState: ['addressState'],
                billingAddressCountry: ['addressCountry'],
            };
            const data = {};
            const source = this.relatedLeadRecord || this.model.attributes || {};

            Object.entries(fieldMap).forEach(([accountField, sourceFields]) => {
                for (const sourceField of sourceFields) {
                    const value = String(source[sourceField] || '').trim();
                    if (value) {
                        data[accountField] = value;
                        break;
                    }
                }
            });

            return data;
        }

        resolveAccountName() {
            const analysis = this.result && this.result.analysis ? this.result.analysis : {};
            const relatedLead = this.relatedLeadRecord || {};
            const candidates = [
                analysis.customerCompany,
                relatedLead.accountName,
                this.model.get('accountName'),
                analysis.customerName,
                relatedLead.name,
                this.model.get('name'),
            ];
            const emptyValues = ['-', 'geen', 'none', 'n/a', 'niet vermeld', 'onbekend'];

            for (const candidate of candidates) {
                const value = String(candidate || '').trim();
                if (value && !emptyValues.includes(value.toLocaleLowerCase('nl-BE'))) {
                    return value;
                }
            }

            return '';
        }

        resolveBusinessCustomer() {
            const analysis = this.result && this.result.analysis ? this.result.analysis : {};
            const company = String(analysis.customerCompany || '').trim().toLocaleLowerCase('nl-BE');
            const emptyValues = ['', '-', 'geen', 'none', 'n/a', 'niet vermeld', 'onbekend'];

            if (!emptyValues.includes(company)) {
                return true;
            }

            const relatedLead = this.relatedLeadRecord || {};
            const context = [
                this.sourceText,
                relatedLead.description,
                this.model.get('description'),
            ].filter(Boolean).join('\n').toLocaleLowerCase('nl-BE');

            if (/\b(b2b|zakelijk|professioneel|business)\b|type\s*:\s*(bedrijf|company)/i.test(context)) {
                return true;
            }

            return false;
        }

        captureCurrentValues() {
            const source = this.$el.find('[data-field="sourceText"]');
            const corrections = this.$el.find('[data-field="corrections"]');
            const customerText = this.$el.find('[data-field="customerText"]');
            const internalText = this.$el.find('[data-field="internalText"]');
            const customerSubject = this.$el.find('[data-field="customerSubject"]');
            const commercialTotal = this.$el.find('[data-field="commercialTotal"]');
            const projectSummary = this.$el.find('[data-field="projectSummary"]');

            if (source.length) this.sourceText = source.val();
            if (corrections.length) this.corrections = corrections.val();
            if (commercialTotal.length) this.commercialTotal = commercialTotal.val();
            if (customerText.length && this.result) this.result.quote.customerText = customerText.val();
            if (internalText.length && this.result) this.result.quote.internalText = internalText.val();
            if (customerSubject.length && this.result) this.result.quote.customerSubject = customerSubject.val();
            if (projectSummary.length && this.result && this.result.projectDraft) {
                this.result.projectDraft.summary = projectSummary.val();
            }
        }

        buildSavePayload() {
            const {analysis, quote, ai} = this.result;
            const validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + 30);

            const payload = {
                name: analysis.quoteTitle || `Conceptofferte ${this.model.get('name') || ''}`.trim(),
                status: 'Draft',
                sourceRecordType: this.scope,
                sourceRecordId: this.model.id,
                sourceRecordName: this.model.get('name') || '',
                sourceType: this.scope === 'X3dImport' ? 'X3DImport' : analysis.sourceType,
                requestSummary: analysis.requestSummary,
                customerLanguage: quote.customerLanguage,
                customerSubject: quote.customerSubject,
                sourceText: this.sourceText,
                internalText: quote.internalText,
                projectSummary: this.result.projectDraft ? this.result.projectDraft.summary : '',
                lineItemsText: JSON.stringify(quote.lineItems, null, 2),
                assumptions: (analysis.assumptions || []).join('\n'),
                missingInformation: (quote.missingInformation || []).join('\n'),
                customerText: quote.customerText,
                currency: quote.currency,
                totalExclVat: quote.totalExclVat,
                calculatedTotalExclVat: quote.calculatedTotalExclVat,
                commercialAdjustment: quote.commercialAdjustment,
                optionsTotal: quote.optionsTotal,
                totalWithOptions: quote.totalWithOptions,
                vatRate: quote.vatRate,
                vatAmount: quote.vatAmount,
                totalInclVat: quote.totalInclVat,
                vatStatement: quote.vatStatement,
                validUntil: validUntil.toISOString().slice(0, 10),
                priceRulesVersion: quote.rulesVersion,
                aiModel: ai.model,
                aiResponseId: ai.responseId,
                promptVersion: ai.promptVersion,
            };

            if (this.scope === 'Lead') {
                payload.leadId = this.model.id;
                payload.leadName = this.model.get('name') || '';
            }
            if (this.scope === 'Opportunity') {
                payload.opportunityId = this.model.id;
                payload.opportunityName = this.model.get('name') || '';
            }
            if (this.scope === 'X3dImport') {
                payload.x3dImportId = this.model.id;
                payload.x3dImportName = this.model.get('name') || '';
            }
            if (this.scope === 'Email') {
                payload.emailId = this.model.id;
                payload.emailName = this.model.get('name') || '';
            }

            const projectId = this.resolveProjectId();
            if (projectId && this.scope !== 'Opportunity') {
                payload.opportunityId = projectId;
                payload.opportunityName = this.model.get('parentName') || '';
            }

            const assignedUserId = this.model.get('assignedUserId');
            if (assignedUserId) {
                payload.assignedUserId = assignedUserId;
                payload.assignedUserName = this.model.get('assignedUserName') || '';
            }

            return payload;
        }

        prepareQuote(quote) {
            const languageName = {nl: 'Nederlands', fr: 'Frans', en: 'Engels', de: 'Duits'};

            return {
                ...quote,
                totalExclVatFormatted: this.formatMoney(quote.totalExclVat),
                calculatedTotalExclVatFormatted: this.formatMoney(quote.calculatedTotalExclVat),
                totalInclVatFormatted: this.formatMoney(quote.totalInclVat),
                totalWithOptionsFormatted: this.formatMoney(quote.totalWithOptions),
                optionalDeliveryCostFormatted: this.formatMoney(quote.optionalDeliveryCost),
                hasOptions: Number(quote.optionsTotal || 0) > 0,
                hasOptionalDelivery: Number(quote.optionalDeliveryCost || 0) > 0,
                hasCommercialAdjustment: Math.abs(Number(quote.commercialAdjustment || 0)) >= 0.005,
                customerLanguageLabel: languageName[quote.customerLanguage] || quote.customerLanguage,
                lineItems: (quote.lineItems || []).map(item => ({
                    ...item,
                    pricingRoleLabel: item.pricingRole === 'option'
                        ? 'Optie'
                        : item.pricingRole === 'alternative' ? 'Alternatief'
                        : item.pricingRole === 'delivery-option' ? 'Verzending' : 'Basis',
                    unitPriceFormatted: this.formatMoney(item.unitPrice),
                    totalFormatted: this.formatMoney(item.total),
                })),
            };
        }

        async actionCopyCustomerMail() {
            this.captureCurrentValues();
            if (!this.result) return;

            const text = `Onderwerp: ${this.result.quote.customerSubject}\n\n${this.result.quote.customerText}`;
            try {
                await navigator.clipboard.writeText(text);
                this.statusMessage = 'Klantmail gekopieerd. Controleer hem voor verzending.';
                this.statusClass = 'alert-success';
            } catch (error) {
                this.statusMessage = 'Kopiëren werd door de browser geblokkeerd. Selecteer de klantmail handmatig.';
                this.statusClass = 'alert-warning';
            }
            await this.reRender();
        }

        resolveProjectId() {
            if (this.projectRecord && this.projectRecord.id) {
                return this.projectRecord.id;
            }
            if (this.scope === 'Opportunity') {
                return this.model.id;
            }
            if (this.model.get('opportunityId')) {
                return this.model.get('opportunityId');
            }
            if (this.scope === 'Email' && this.model.get('parentType') === 'Opportunity') {
                return this.model.get('parentId');
            }
            if (this.scope === 'X3dImport') {
                const opportunityUrl = this.model.get('opportunityUrl') || '';
                const match = opportunityUrl.match(/Opportunity\/view\/([^/?#]+)/);
                return match ? match[1] : null;
            }

            return null;
        }

        mergeProjectDescription(description, summary) {
            const start = '--- X3D AI-OFFERTE ---';
            const end = '--- EINDE X3D AI-OFFERTE ---';
            const block = `${start}\n${summary}\n${end}`;
            const existing = String(description || '').trim();
            const pattern = /--- X3D AI-OFFERTE ---[\s\S]*?--- EINDE X3D AI-OFFERTE ---/g;

            if (pattern.test(existing)) {
                return existing.replace(pattern, block).trim();
            }

            return existing ? `${existing}\n\n${block}` : block;
        }

        stripHtml(value) {
            if (!value) {
                return '';
            }

            const documentValue = new DOMParser().parseFromString(String(value), 'text/html');
            return (documentValue.body.textContent || '').trim();
        }

        formatMoney(value) {
            return Number(value || 0).toLocaleString('nl-BE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }

        readError(xhr) {
            return xhr && xhr.responseJSON && xhr.responseJSON.message
                ? xhr.responseJSON.message
                : 'De actie is mislukt. Controleer de serverconfiguratie en probeer opnieuw.';
        }
    }
});
