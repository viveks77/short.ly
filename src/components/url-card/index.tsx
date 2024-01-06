import type { ShortUrl } from "@prisma/client";
import { useMemo } from "react";
import {
  Card, CardTitle,
  CardDescription
} from "../ui/card";
import { env } from "../../env";
import { ArrowTopRightIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QrCodeIcon } from "../common/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import QRCode from "react-qr-code";

type Props = {
  shortUrl: ShortUrl;
};

const BaseUrl = process.env.NODE_ENV === "production"
    ? `https://${env.NEXT_PUBLIC_APP_NAME}`
    : `http://localhost:${process.env.PORT ?? 3000}`;

const UrlCard = ({ shortUrl }: Props) => {
  const { toast } = useToast();
  const uri = useMemo(() => {
    return BaseUrl + "/" + shortUrl.alias;
  }, [shortUrl.alias]);

  const getUrlName = (alias: string) => env.NEXT_PUBLIC_APP_NAME + "/" + alias;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(BaseUrl + "/" + shortUrl.alias);
    toast({
      title: "URL copied to Clipboard",
    });
  };

  return (
    <Card>
      <div className="flex items-center p-5">
        <div className="flex-1">
          <CardTitle className="mb-2">
            <a className="flex items-center" href={uri}>
              {getUrlName(shortUrl.alias)}
              <ArrowTopRightIcon className="ml-2" />
            </a>
          </CardTitle>
          <CardDescription className="overflow-hidden text-ellipsis" style={{lineBreak: "anywhere"}}>
            <a title={shortUrl.url} target="_blank" href={shortUrl.url}>
              {shortUrl.url.substring(0, 40) + (shortUrl.url.length < 40 ? '' : '...')}
            </a>
          </CardDescription>
        </div>
        <div className="mx-4 flex items-center space-x-2">
          <Button
            onClick={copyToClipboard}
            title="Copy to clipboard"
            variant="outline"
            size="icon"
          >
            <CopyIcon />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button title="Show QR code" variant="outline" size="icon">
                <QrCodeIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit items-center justify-center">
              <div className="bg-white p-1">
                <QRCode value={uri} size={120} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default UrlCard;
