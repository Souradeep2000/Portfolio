export const environment = {
  production: true,
  emailServiceId: process.env['EMAIL_SERVICE_ID'] || '',
  emailTemplateId: process.env['EMAIL_TEMPLATE_ID'] || '',
  emailPublicKey: process.env['EMAIL_PUBLIC_KEY'] || '',
};
