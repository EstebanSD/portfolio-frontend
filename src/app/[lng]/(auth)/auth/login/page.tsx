import { serverTranslation } from '@/lib/i18n';
import { LoginForm } from '@/components/auth';

type Props = {
  params: Promise<{ lng: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'auth');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login.page.title')}
          </h2>
        </div>

        <LoginForm lng={lng} />
      </div>
    </div>
  );
}
