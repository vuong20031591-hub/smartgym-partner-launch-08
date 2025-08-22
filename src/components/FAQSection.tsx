import { useEffect, useRef } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  const faqs = [
    {
      question: 'Chi phí đầu tư ban đầu là bao nhiêu?',
      answer: 'Chi phí đầu tư phụ thuộc vào quy mô và vị trí. Gói Lite từ 800 triệu, gói Standard từ 1.5 tỷ, gói Flagship từ 2.5 tỷ. Bao gồm thiết bị, setup, đào tạo và hỗ trợ 6 tháng đầu.'
    },
    {
      question: 'Thời gian lắp đặt và đi vào hoạt động?',
      answer: 'Thời gian trung bình từ 8-12 tuần từ khi ký hợp đồng. Bao gồm khảo sát (1-2 tuần), thiết kế (2-3 tuần), thi công lắp đặt (3-4 tuần), và vận hành thử nghiệm (1 tuần).'
    },
    {
      question: 'Có đào tạo vận hành không?',
      answer: 'Có chương trình đào tạo toàn diện 40 giờ bao gồm: vận hành hệ thống, customer service, marketing, quản lý tài chính. Hỗ trợ onsite 2 tuần đầu và hotline 24/7.'
    },
    {
      question: 'Có cam kết về doanh thu không?',
      answer: 'Chúng tôi cam kết hỗ trợ đạt break-even trong 18-24 tháng với điều kiện tuân thủ quy trình vận hành. Không cam kết doanh thu cụ thể do phụ thuộc nhiều yếu tố địa phương.'
    },
    {
      question: 'Chính sách hỗ trợ marketing như thế nào?',
      answer: 'Hỗ trợ thiết kế brand identity, chiến lược marketing địa phương, setup Google Ads & Facebook Ads, content marketing và PR khai trương. Budget marketing tối thiểu 50 triệu/tháng trong 6 tháng đầu.'
    },
    {
      question: 'Bảo hành thiết bị trong bao lâu?',
      answer: 'Thiết bị cơ bản bảo hành 2 năm, thiết bị IoT/công nghệ bảo hành 1 năm. Bảo trì định kỳ 6 tháng/lần. Hỗ trợ kỹ thuật 24/7 qua hotline và remote support.'
    },
    {
      question: 'Có hỗ trợ tài chính hay vay vốn không?',
      answer: 'Hỗ trợ kết nối với các ngân hàng đối tác để vay vốn ưu đãi. Có thể trả góp thiết bị trong 24 tháng với lãi suất ưu đãi. Hỗ trợ lập business plan cho hồ sơ vay.'
    },
    {
      question: 'Quyền lợi độc quyền khu vực như thế nào?',
      answer: 'Bảo vệ khu vực trong bán kính 2km cho gói Lite, 3km cho Standard và 5km cho Flagship. Ưu tiên mở rộng cùng đối tác hiện tại khi có cơ hội trong khu vực lân cận.'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const faqItems = sectionRef.current.querySelectorAll('.faq-item');

    gsap.set(faqItems, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(faqItems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger]);

  return (
    <section id="faq" ref={sectionRef} className="py-20 bg-gradient-subtle relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Câu hỏi thường gặp
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Những thắc mắc phổ biến về mô hình nhượng quyền SmartGym Partner Network
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-glass border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                Tất cả thông tin bạn cần biết
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="faq-item border border-border/30 rounded-xl px-6 hover:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline group">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="pl-12">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact CTA */}
              <div className="mt-12 text-center p-8 bg-gradient-primary rounded-2xl text-primary-foreground">
                <h3 className="text-xl font-heading font-semibold mb-2">
                  Vẫn còn thắc mắc?
                </h3>
                <p className="mb-4 opacity-90">
                  Đội ngũ tư vấn của chúng tôi sẵn sàng giải đáp mọi câu hỏi
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Hotline:</span>
                    <span className="text-lg">1900-SGPN (7476)</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-white/30" />
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Email:</span>
                    <span className="text-lg">partner@sgpn.vn</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default FAQSection;