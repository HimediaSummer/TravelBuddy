package travelbuddy.function.community.qnafaq.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelbuddy.function.community.qnafaq.controller.QnaController;
import travelbuddy.function.community.qnafaq.dto.FaqDTO;
import travelbuddy.function.community.qnafaq.entity.Faq;
import travelbuddy.function.community.qnafaq.repository.FaqRepository;

import java.util.List;

@Service
public class FaqService {

    private static final Logger log = LoggerFactory.getLogger(QnaController.class);
    private FaqRepository faqRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FaqService(ModelMapper modelMapper, FaqRepository faqRepository) {
        this.modelMapper = modelMapper;
        this.faqRepository = faqRepository;
    }

    public Object selectFaqList() {

        List<Faq> faqList = faqRepository.findAll();
        return faqList.stream().map((Faq) -> modelMapper.map(Faq, FaqDTO.class));

    }

    public Object selectFaq(int faqCode) {
        Faq faq = faqRepository.findById(faqCode).get();

        return modelMapper.map(faq, FaqDTO.class);
    }
}
