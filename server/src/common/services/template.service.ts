import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class TemplateService {
    async renderTemplateWithData(templatePath: string, data: any): Promise<string> {
        const templateContent = await fs.promises.readFile(templatePath, 'utf8');
        const compiledTemplate = handlebars.compile(templateContent);
        const renderedTemplate = await compiledTemplate(data);
        return renderedTemplate
    }
}
