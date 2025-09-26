import WhatsappOutline from "@/components/icons/whatsapp-outline";
import { Card, CardContent } from "@/components/ui/card";

const NeedHelpCard = ({ phone_number }: { phone_number: string }) => {
    return (
        <div className="space-y-3">
            <h3 className="font-bold text-[#202020]">Need Any Help?</h3>

            <Card className="bg-[#448CD9]/10 shadow-none py-0">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                            <WhatsappOutline />
                        </div>
                        <div>
                            <p className="font-semibold text-[#202020]">
                                Whats App
                            </p>
                            <p className="text-[#202020] font-bold text-lg">
                                {phone_number}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NeedHelpCard;
