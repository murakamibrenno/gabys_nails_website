import type { FotoGaleria } from '../types'

import cromadoPrata from '../assets/galeria/cromado-prata.webp'
import borboletaLilas from '../assets/galeria/borboleta-lilas.webp'
import detalhesDourados from '../assets/galeria/detalhes-dourados.webp'
import verdeEsmeralda from '../assets/galeria/verde-esmeralda.webp'
import francesinhaVerde from '../assets/galeria/francesinha-verde.webp'
import vermelhoCoracao from '../assets/galeria/vermelho-coracao.webp'
import douradoMetalico from '../assets/galeria/dourado-metalico.webp'
import verdeAzulado3d from '../assets/galeria/verde-azulado-3d.webp'
import brancoLeitoso from '../assets/galeria/branco-leitoso.webp'
import pretoClassico from '../assets/galeria/preto-classico.webp'
import vinhoClassico from '../assets/galeria/vinho-classico.webp'
import celestialDourado from '../assets/galeria/celestial-dourado.webp'
import poaPretoLaco from '../assets/galeria/poa-preto-laco.webp'
import cromadoMagenta from '../assets/galeria/cromado-magenta.webp'
import vinhoPerolasPrata from '../assets/galeria/vinho-perolas-prata.webp'
import cromadoMagentaPerolas from '../assets/galeria/cromado-magenta-perolas.webp'
import catEyeMalva from '../assets/galeria/cat-eye-malva.webp'
import auroraCoquette from '../assets/galeria/aurora-coquette.webp'
import cromadoRosaIntenso from '../assets/galeria/cromado-rosa-intenso.webp'
import celestialAzul from '../assets/galeria/celestial-azul.webp'
import glitterRosaLaco from '../assets/galeria/glitter-rosa-laco.webp'
import cromadoEstrelaVermelha from '../assets/galeria/cromado-estrela-vermelha.webp'
import butterflyRoxo3d from '../assets/galeria/butterfly-roxo-3d.webp'
import sakuraVinho from '../assets/galeria/sakura-vinho.webp'
import cremeBordaDourada from '../assets/galeria/creme-borda-dourada.webp'

export const galeria: FotoGaleria[] = [
  {
    id: 'vermelho-coracao',
    titulo: 'Vermelho coração',
    categoria: 'Decoração',
    src: vermelhoCoracao,
  },
  {
    id: 'sakura-vinho',
    titulo: 'Sakura & vinho',
    categoria: 'Decoração',
    src: sakuraVinho,
  },
  {
    id: 'aurora-coquette',
    titulo: 'Aurora coquette',
    categoria: 'Decoração',
    src: auroraCoquette,
  },
  {
    id: 'celestial-azul',
    titulo: 'Celestial azul',
    categoria: 'Decoração',
    src: celestialAzul,
  },
  {
    id: 'borboleta-lilas',
    titulo: 'Borboleta 3D lilás',
    categoria: 'Decoração',
    src: borboletaLilas,
  },
  {
    id: 'butterfly-roxo-3d',
    titulo: 'Butterfly roxo 3D',
    categoria: 'Decoração',
    src: butterflyRoxo3d,
  },
  {
    id: 'verde-azulado-3d',
    titulo: 'Verde azulado 3D',
    categoria: 'Decoração',
    src: verdeAzulado3d,
  },
  {
    id: 'celestial-dourado',
    titulo: 'Celestial dourado',
    categoria: 'Decoração',
    src: celestialDourado,
  },
  {
    id: 'poa-preto-laco',
    titulo: 'Poá preto & laço',
    categoria: 'Decoração',
    src: poaPretoLaco,
  },
  {
    id: 'glitter-rosa-laco',
    titulo: 'Glitter rosa & laço',
    categoria: 'Decoração',
    src: glitterRosaLaco,
  },
  {
    id: 'vinho-perolas-prata',
    titulo: 'Vinho & pérolas prata',
    categoria: 'Decoração',
    src: vinhoPerolasPrata,
  },
  {
    id: 'cromado-magenta-perolas',
    titulo: 'Cromado magenta & pérolas',
    categoria: 'Decoração',
    src: cromadoMagentaPerolas,
  },
  {
    id: 'cromado-estrela-vermelha',
    titulo: 'Cromado estrela vermelha',
    categoria: 'Decoração',
    src: cromadoEstrelaVermelha,
  },
  {
    id: 'cromado-prata',
    titulo: 'Cromado prata',
    categoria: 'Alongamento',
    src: cromadoPrata,
  },
  {
    id: 'cromado-magenta',
    titulo: 'Cromado magenta',
    categoria: 'Alongamento',
    src: cromadoMagenta,
  },
  {
    id: 'cromado-rosa-intenso',
    titulo: 'Cromado rosa intenso',
    categoria: 'Alongamento',
    src: cromadoRosaIntenso,
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
    id: 'branco-leitoso',
    titulo: 'Branco leitoso',
    categoria: 'Alongamento',
    src: brancoLeitoso,
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
  {
    id: 'preto-classico',
    titulo: 'Preto clássico',
    categoria: 'Esmaltação',
    src: pretoClassico,
  },
  {
    id: 'vinho-classico',
    titulo: 'Vinho clássico',
    categoria: 'Esmaltação',
    src: vinhoClassico,
  },
  {
    id: 'cat-eye-malva',
    titulo: 'Cat-eye malva',
    categoria: 'Esmaltação',
    src: catEyeMalva,
  },
  {
    id: 'creme-borda-dourada',
    titulo: 'Creme & borda dourada',
    categoria: 'Esmaltação',
    src: cremeBordaDourada,
  },
]

export const categorias = ['Todas', 'Alongamento', 'Esmaltação', 'Decoração']
