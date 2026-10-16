'use client';

import { useTranslations } from 'next-intl';
import FooterBrand from './FooterBrand';
import FooterColumn from './FooterColumn';

const FEATURED_GENRES = [
  { id: '28', key: 'action' },
  { id: '18', key: 'drama' },
  { id: '35', key: 'comedy' },
  { id: '878', key: 'sciFi' },
  { id: '53', key: 'thriller' },
  { id: '16', key: 'animation' },
] as const;

export default function FooterLinks() {
  const t = useTranslations('Footer');
  const tGenres = useTranslations('Filters.genres');

  const columns = [
    {
      title: t('explore'),
      links: [
        { href: '/', label: t('exploreLinks.home') },
        { href: '/movies', label: t('exploreLinks.movies') },
        { href: '/tv-shows', label: t('exploreLinks.tvShows') },
        { href: '/people', label: t('exploreLinks.people') },
      ],
    },
    {
      title: t('discover'),
      links: [
        {
          href: { pathname: '/movies', query: { sort_by: 'popularity.desc' } },
          label: t('discoverLinks.popularMovies'),
        },
        {
          href: { pathname: '/movies', query: { sort_by: 'vote_average.desc' } },
          label: t('discoverLinks.topRated'),
        },
        {
          href: { pathname: '/movies', query: { sort_by: 'primary_release_date.desc' } },
          label: t('discoverLinks.newReleases'),
        },
        {
          href: { pathname: '/tv-shows', query: { sort_by: 'popularity.desc' } },
          label: t('discoverLinks.popularTv'),
        },
      ],
    },
    {
      title: t('genres'),
      links: FEATURED_GENRES.map((genre) => ({
        href: { pathname: '/movies', query: { with_genres: genre.id } },
        label: tGenres(genre.key),
      })),
    },
    {
      title: t('company'),
      links: [
        { href: '/about', label: t('companyLinks.about') },
        { href: '/careers', label: t('companyLinks.careers') },
        { href: '/press', label: t('companyLinks.press') },
        { href: '/guidelines', label: t('companyLinks.guidelines') },
        { href: '/subscription', label: t('companyLinks.subscription') },
      ],
    },
    {
      title: t('support'),
      links: [
        { href: '/help', label: t('supportLinks.helpCenter') },
        { href: '/faq', label: t('supportLinks.faq') },
        { href: '/contact', label: t('supportLinks.contact') },
        { href: '/feedback', label: t('supportLinks.feedback') },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
      <FooterBrand />
      {columns.map((column) => (
        <FooterColumn key={column.title} title={column.title} links={column.links} />
      ))}
    </div>
  );
}
