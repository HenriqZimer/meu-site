/**
 * Utilitários para manipulação de imagens
 * Funções reutilizáveis para URLs e otimização de imagens
 */

import { IMAGE_URLS } from "~/constants";

/**
 * Gera URL otimizada para imagem com width e formato
 * @param baseUrl - URL base da imagem
 * @param width - Largura desejada
 * @param format - Formato da imagem (webp, jpg, png)
 */
export const getOptimizedImageUrl = (
  baseUrl: string,
  width: number,
  format: string = "webp"
): string => {
  return `${baseUrl}?w=${width}&f=${format}`;
};

/**
 * Gera URL da foto de perfil otimizada
 * @param width - Largura desejada
 * @param format - Formato da imagem
 */
export const getProfilePhotoUrl = (
  width: number = 400,
  format: string = "webp"
): string => {
  return getOptimizedImageUrl(IMAGE_URLS.PROFILE_PHOTO, width, format);
};

/**
 * Gera srcset para imagens responsivas
 * @param baseUrl - URL base da imagem
 * @param widths - Array de larguras
 * @param format - Formato da imagem
 */
export const generateSrcSet = (
  baseUrl: string,
  widths: number[] = [400, 800, 1200],
  format: string = "webp"
): string => {
  return widths
    .map((width) => `${getOptimizedImageUrl(baseUrl, width, format)} ${width}w`)
    .join(", ");
};

/**
 * Verifica se uma URL de imagem é válida
 * @param url - URL da imagem
 */
export const isValidImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url);
};

/**
 * Extrai extensão de uma URL de imagem
 * @param url - URL da imagem
 */
export const getImageExtension = (url: string): string => {
  const match = url.match(/\.([a-z]+)(\?.*)?$/i);
  return match?.[1] || "";
};
