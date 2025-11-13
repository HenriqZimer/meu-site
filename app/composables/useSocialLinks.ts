/**
 * Composable para social links
 * Centraliza configuração de redes sociais
 * Usado em: Hero, Footer, Contact
 */

import { buildSocialLinks, buildFooterSocialLinks } from "~/constants";

export const useSocialLinks = () => {
  const config = useRuntimeConfig();

  /**
   * Links sociais completos (com label para aria)
   */
  const socialLinks = buildSocialLinks(config);

  /**
   * Links sociais para footer (formato simplificado)
   */
  const footerSocialLinks = buildFooterSocialLinks(config);

  /**
   * Informações de contato
   */
  const contactInfo = {
    email: config.public.email,
    phone: config.public.phone,
    location: config.public.location,
    whatsapp: `https://wa.me/${config.public.phone.replace(/\D/g, "")}?text=Estou%20entrando%20em%20contato%20pelo%20seu%20site`,
  };

  return {
    socialLinks,
    footerSocialLinks,
    contactInfo,
  };
};
