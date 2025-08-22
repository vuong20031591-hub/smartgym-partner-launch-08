import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import successImage from '@/assets/success-story.jpg';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Anh Minh Tuấn',
      location: 'Quận 7, TP.HCM',
      business: 'SmartGym Phú Mỹ Hưng',
      quote: 'Sau 14 tháng hoạt động, phòng tập đã thu hút 380 hội viên với doanh thu ổn định 280 triệu/tháng. Hệ thống tự động giúp tôi tiết kiệm 70% thời gian vận hành.',
      metrics: {
        revenue: '280 triệu/tháng',
        members: '380 hội viên',
        roi: '14 tháng'
      },
      image: successImage
    },
    {
      name: 'Chị Lan Phương',
      location: 'Đống Đa, Hà Nội',
      business: 'SmartGym Royal City',
      quote: 'Công nghệ AI giúp tôi dự đoán chính xác giờ cao điểm và tối ưu hóa lịch PT. Lợi nhuận tăng 45% so với mô hình truyền thống mà tôi từng vận hành.',
      metrics: {
        revenue: '320 triệu/tháng',
        members: '425 hội viên',
        roi: '16 tháng'
      },
      image: successImage
    },
    {
      name: 'Anh Đức Anh',
      location: 'Bình Thạnh, TP.HCM',
      business: 'SmartGym Landmark',
      quote: 'App thành viên và hệ thống thanh toán tự động giúp giảm thiểu sai sót và tăng trải nghiệm khách hàng. Tỉ lệ gia hạn đạt 82%, cao hơn kỳ vọng.',
      metrics: {
        revenue: '450 triệu/tháng',
        members: '520 hội viên',
        roi: '12 tháng'
      },
      image: successImage
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!carouselRef.current) return;

    gsap.to(carouselRef.current, {
      x: -currentSlide * 100 + '%',
      duration: 0.8,
      ease: "power2.out"
    });
  }, [currentSlide, gsap]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.testimonial-card');

    gsap.set(cards, { scale: 0.9, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        });
      }
    });

    // Auto-play carousel
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [gsap, ScrollTrigger]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Câu chuyện thành công
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Những đối tác đã thành công với mô hình SmartGym Partner Network
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-800 ease-out"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="testimonial-card mx-4 bg-background border-border hover:shadow-card transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Content */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                          </div>
                          
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                            <blockquote className="text-lg text-muted-foreground leading-relaxed pl-6">
                              "{testimonial.quote}"
                            </blockquote>
                          </div>

                          <div className="pt-6 border-t border-border">
                            <div className="mb-4">
                              <h4 className="font-heading font-semibold text-foreground text-lg">
                                {testimonial.name}
                              </h4>
                              <p className="text-muted-foreground">
                                {testimonial.business} • {testimonial.location}
                              </p>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-heading font-bold text-primary">
                                  {testimonial.metrics.revenue.split('/')[0]}
                                </div>
                                <div className="text-xs text-muted-foreground">Doanh thu/tháng</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-heading font-bold text-primary">
                                  {testimonial.metrics.members.split(' ')[0]}
                                </div>
                                <div className="text-xs text-muted-foreground">Hội viên</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-heading font-bold text-primary">
                                  {testimonial.metrics.roi.split(' ')[0]}
                                </div>
                                <div className="text-xs text-muted-foreground">Hoàn vốn</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.business}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default TestimonialsSection;