<footer class="bg-black text-white py-12 px-4 md:px-8 lg:px-16">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="//unpkg.com/alpinejs" defer></script>
    <div class="container mx-auto tempo-a453fdcb-9671-5254-8af9-825be2414a49" tempoelementid="tempo-a453fdcb-9671-5254-8af9-825be2414a49">
        <div class="flex flex-col md:flex-row justify-between mb-8 gap-8 tempo-52e3b261-9c49-5b6a-b2ce-69bad5996fff" tempoelementid="tempo-52e3b261-9c49-5b6a-b2ce-69bad5996fff">
            <div class="md:w-1/3 tempo-7cae3f1b-9fec-579c-96bc-2b4f84dc6553" tempoelementid="tempo-7cae3f1b-9fec-579c-96bc-2b4f84dc6553">
                <div class="flex items-center mb-4 tempo-d6b57f8c-da49-5a9c-ac45-0a08d9fc7cb7" tempoelementid="tempo-d6b57f8c-da49-5a9c-ac45-0a08d9fc7cb7">
                    <img src="{{ $logoSrc ?? asset('https://i.ibb.co/939JH0yC/344753576-269776018821308-8152932488548493632-n.jpg') }}" alt="Barangay Calumpang Health Center" class="h-10 w-10 mr-3 tempo-246a19c6-140e-5ec4-a946-e795a0910e7a" tempoelementid="tempo-246a19c6-140e-5ec4-a946-e795a0910e7a">
                    <h3 class="text-xl font-bold tempo-d5dcf822-a644-53ba-9d46-df0ff750457e" tempoelementid="tempo-d5dcf822-a644-53ba-9d46-df0ff750457e">Calumpang Health Center</h3>
                </div>
                <p class="text-slate-300 mb-4 tempo-9b9811fa-0616-5c33-b403-988364c2255f" tempoelementid="tempo-9b9811fa-0616-5c33-b403-988364c2255f">
                    Providing quality healthcare services to the residents of Barangay Calumpang through our innovative digital health management system.
                </p>
                <div class="flex space-x-4 tempo-0f219853-4d7b-5834-a18d-7f391f608bcd" tempoelementid="tempo-0f219853-4d7b-5834-a18d-7f391f608bcd">
                    @foreach($socialLinks as $link)
                        <a href="{{ $link['url'] }}" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white transition-colors tempo-33cc9b16-cea1-5940-8c98-4a2738c5c2b3" aria-label="{{ $link['platform'] }}" tempoelementid="tempo-33cc9b16-cea1-5940-8c98-4a2738c5c2b3">
                            @switch($link['platform'])
                                @case('Facebook')
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook tempo-1bd3f819-b326-5f15-a2e7-b72a4b544fb5" tempoelementid="tempo-1bd3f819-b326-5f15-a2e7-b72a4b544fb5">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                @break
                                @case('Twitter')
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter tempo-36f9a189-cb7c-5282-8eed-6a5c7d73fae4" tempoelementid="tempo-36f9a189-cb7c-5282-8eed-6a5c7d73fae4">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                    </svg>
                                @break
                                @case('Instagram')
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram tempo-92febe25-5b90-5988-a441-15e5becd8f14" tempoelementid="tempo-92febe25-5b90-5988-a441-15e5becd8f14">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                    </svg>
                                @break
                            @endswitch
                        </a>
                    @endforeach
                </div>
            </div>

            <div class="md:w-1/3 tempo-49275ac9-14c6-500d-8b1b-76164e48fe51" tempoelementid="tempo-49275ac9-14c6-500d-8b1b-76164e48fe51">
                <h4 class="text-lg font-semibold mb-4 tempo-b9befdd6-792f-5763-88c3-7dd38c531c17" tempoelementid="tempo-b9befdd6-792f-5763-88c3-7dd38c531c17">Quick Links</h4>
                <div class="grid grid-cols-2 gap-2 tempo-89f7ab01-b630-5b8e-94fa-c44a336a284e" tempoelementid="tempo-89f7ab01-b630-5b8e-94fa-c44a336a284e">
                    @foreach($quickLinks as $link)
                        <a href="{{ $link['url'] }}" class="text-slate-300 hover:text-white transition-colors py-1 tempo-fbb6feac-a65d-594c-9605-704d058572df" tempoelementid="tempo-fbb6feac-a65d-594c-9605-704d058572df">
                            {{ $link['title'] }}
                        </a>
                    @endforeach
                </div>
            </div>

            <div class="md:w-1/3 tempo-d8630693-8d9d-5c83-985d-b84fef62fb59" tempoelementid="tempo-d8630693-8d9d-5c83-985d-b84fef62fb59">
                <h4 class="text-lg font-semibold mb-4 tempo-3b570d70-5459-5242-a571-6ddcd0f0f7f3" tempoelementid="tempo-3b570d70-5459-5242-a571-6ddcd0f0f7f3">Contact Us</h4>
                <div class="space-y-3 tempo-071c1980-e4c5-54e4-93c4-ed68f2ec6927" tempoelementid="tempo-071c1980-e4c5-54e4-93c4-ed68f2ec6927">
                    <div class="flex items-start tempo-69d5f99d-b012-5cab-b083-86092c8682fd" tempoelementid="tempo-69d5f99d-b012-5cab-b083-86092c8682fd">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-2 h-5 w-5 text-slate-300 mt-0.5 tempo-d198242c-683d-5b06-a220-ba8eecb18f15" tempoelementid="tempo-d198242c-683d-5b06-a220-ba8eecb18f15">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span class="text-slate-300 tempo-ed3a8bc4-2720-5971-a764-7aae056fdb2f" tempoelementid="tempo-ed3a8bc4-2720-5971-a764-7aae056fdb2f">{{ $contactInfo['address'] }}</span>
                    </div>
                    <div class="flex items-center tempo-3ccce986-0e0c-599e-92a0-452b092c8aaa" tempoelementid="tempo-3ccce986-0e0c-599e-92a0-452b092c8aaa">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone mr-2 h-5 w-5 text-slate-300 tempo-afceff72-0dca-5e90-ab4e-2aa12b9c39fe" tempoelementid="tempo-afceff72-0dca-5e90-ab4e-2aa12b9c39fe">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span class="text-slate-300 tempo-9626e4a5-7087-5de8-8def-d7af15386398" tempoelementid="tempo-9626e4a5-7087-5de8-8def-d7af15386398">{{ $contactInfo['phone'] }}</span>
                    </div>
                    <div class="flex items-center tempo-2dd02c62-ba89-5aa8-bbed-041a41d38ee8" tempoelementid="tempo-2dd02c62-ba89-5aa8-bbed-041a41d38ee8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail mr-2 h-5 w-5 text-slate-300 tempo-980e0ec6-8584-516c-bcb4-f4aed21e850f" tempoelementid="tempo-980e0ec6-8584-516c-bcb4-f4aed21e850f">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        <span class="text-slate-300 tempo-b5e3150d-6c99-595c-bea1-8bc69a6ec444" tempoelementid="tempo-b5e3150d-6c99-595c-bea1-8bc69a6ec444">{{ $contactInfo['email'] }}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-slate-700 my-6 tempo-d6ef718a-6081-55f0-b3cd-e94e2288887d tempo-9998d61e-7d7f-5175-9c46-076526a2d1b8" tempoelementid="tempo-9998d61e-7d7f-5175-9c46-076526a2d1b8">

        <div class="flex flex-col md:flex-row justify-between items-center tempo-15136760-b8e1-5d66-8d07-07215c48d25a" tempoelementid="tempo-15136760-b8e1-5d66-8d07-07215c48d25a">
            <p class="text-slate-400 text-sm mb-4 md:mb-0 tempo-a22ed751-1e42-5a7a-bab8-00675552aeb8" tempoelementid="tempo-a22ed751-1e42-5a7a-bab8-00675552aeb8">
                © {{ date('Y') }} Barangay Calumpang Health Center. All rights reserved.
            </p>
            <button type="button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm hover:text-accent-foreground h-9 w-9 rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700 tempo-71e2d89e-b536-5c95-a462-d51ccde28674 tempo-e3a01bad-c718-5b98-9ad9-ee678800247c" aria-label="Back to top" tempoelementid="tempo-e3a01bad-c718-5b98-9ad9-ee678800247c">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up h-5 w-5 tempo-894944d9-1440-571a-8639-dd0cf80c3f35" tempoelementid="tempo-894944d9-1440-571a-8639-dd0cf80c3f35">
                    <path d="m18 15-6-6-6 6"></path>
                </svg>
            </button>
        </div>
    </div>
</footer>
