import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Bell, Globe, Lock, Monitor } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Settings" })
  return { title: t("title") }
}

export default async function SettingsPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-background px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="IMDb"
              width={100}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <User className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Account</p>
                <p className="text-xs text-muted-foreground">Manage your account details</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <Lock className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Privacy</p>
                <p className="text-xs text-muted-foreground">Control your privacy settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <Bell className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Choose what to be notified about</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <Globe className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-xs text-muted-foreground">Change your language preference</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <Monitor className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <p className="text-xs text-muted-foreground">Customize your theme and display</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
