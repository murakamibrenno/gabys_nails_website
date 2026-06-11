import type { FotoGaleria } from '../types'

import cromadoPrata from '../assets/galeria/cromado-prata.webp'
import borboletaLilas from '../assets/galeria/borboleta-lilas.webp'
import detalhesDourados from '../assets/galeria/detalhes-dourados.webp'
import verdeEsmeralda from '../assets/galeria/verde-esmeralda.webp'
import francesinhaVerde from '../assets/galeria/francesinha-verde.webp'
import vermelhoCoracao from '../assets/galeria/vermelho-coracao.webp'
import douradoMetalico from '../assets/galeria/dourado-metalico.webp'

export const galeria: FotoGaleria[] = [
  {
    id: 'vermelho-coracao',
    titulo: 'Vermelho coração',
    categoria: 'Decoração',
    src: vermelhoCoracao,
  },
  {
    id: 'borboleta-lilas',
    titulo: 'Borboleta 3D lilás',
    categoria: 'Decoração',
    src: borboletaLilas,
  },
  {
    id: 'cromado-prata',
    titulo: 'Cromado prata',
    categoria: 'Alongamento',
    src: cromadoPrata,
  },
  {
    id: 'verde-esmeralda',
    titulo: 'Verde esmeralda',
    categoria: 'Alongamento',
    src: verdeEsmeralda,
  },
  {
    id: 'dourado-metalico',
    titulo: 'Dourado metálico',
    categoria: 'Alongamento',
    src: douradoMetalico,
  },
  {
    id: 'detalhes-dourados',
    titulo: 'Detalhes dourados',
    categoria: 'Esmaltação',
    src: detalhesDourados,
  },
  {
    id: 'francesinha-verde',
    titulo: 'Francesinha verde & ouro',
    categoria: 'Esmaltação',
    src: francesinhaVerde,
  },
]

export const categorias = ['Todas', 'Alongamento', 'Esmaltação', 'Decoração']
